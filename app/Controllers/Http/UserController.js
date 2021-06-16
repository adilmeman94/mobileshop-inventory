"use strict";

const Hash = use("Hash");
const { validateAll } = use("Validator");
const User = use("App/Models/User");
const Mail = use("Mail");

const moment = require("moment");
const crypto = require("crypto");

class UserController {
  /* register newUser */

  async register({ request, response }) {
    try {
      let user = new User();
      user.email = request.input("email");
      user.password = request.input("password");
      user.firstName = request.input("firstName");
      user.lastName = request.input("lastName");
      let success = await user.save();
      return response.status(201).json({
        status: "ok",
        message: "User is registered",
        success: success,
        UserID: user["_id"],
      });
    } catch (error) {
      console.log(error);
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  /* login User  */

  async login({ request, auth, response }) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      let token = await auth.withRefreshToken().attempt(email, password);
      const user = await User.findBy({ email });

      return response.status(200).json({
        status: "ok",
        message: "User Logged in",
        token: token,
        userInfo: user,
      });
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  /* view user profile  */

  async profile({ request, auth, response }) {
    try {
      return await auth.getUser();
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  /* update user profile  */

  async updateProfile({ request, auth, response }) {
    try {
      const { firstName, lastName, email } = request.all();

      const user = await auth.user;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      await user.save();
      return response.status(200).send(user);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }

  /* change password of User  */

  async changePassword({ request, auth, response }) {
    const { oldPassword, newPassword, confirmPassword } = request.all();

    try {
      let user = await auth.getUser();
      if (!user) {
        return response.status(400).send({
          status: "error",
          message: "Invalid User",
        });
      }
      const verifyPassword = await Hash.verify(oldPassword, user.password);

      console.log("verifyPassword", verifyPassword);
      if (verifyPassword && newPassword === confirmPassword) {
        user.password = newPassword;
        let success = await user.save();
        return response.status(201).json({
          status: "ok",
          message: "password is successfully updated",
          success: success,
        });
      } else {
        response.status(400).send({
          status: "error",
          message:
            "oldpassword is wrong or newpassword and confirmpassword are mismatched",
        });
      }
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  /*  logout User  */

  async logout({ request, auth, response, params }) {
    const refreshToken = params.refreshToken;
    if (!refreshToken) {
      // You can throw any exception you want here
      throw BadRequestException.invoke(`Refresh Token missing`);
    }

    await auth.authenticator("jwt").revokeTokens([refreshToken], true);

    return response.send({ status: 200, message: "success" });
  }

  /*  view UserList  */

  async list({ request, response }) {
    try {
      const users = await User.all();
      return users;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  /*  forgot password  */

  async forgotPassword({ request, response }) {
    try {
      const rules = {
        email: "required|email",
      };

      const validation = await validateAll(request.all(), rules);
      if (validation.fails()) {
        return response.status(400).send(validation.messages());
      }
      const { email } = request.only(["email"]);
      const user = await User.findByOrFail("email", email);
      const token = await crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();
      user.token = token;

      await user.save();

      await Mail.send("emails.recover", { user, token }, (message) => {
        message.from("adil.meman@upstrapp.com").to(email);
      });
      return user;
      // response.status(200).json({
      //       message: "Success",
      //     });
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  /* reset password from mail link  */

  async resetPassword({ request, response, params }) {
    const mailToken = params.token;
    const mailEmail = params.email;

    const rules = {
      newPassword: "required|min:6|max:18",
      confirmPassword: "required|min:6|max:18",
    };

    const validation = await validateAll(request.all(), rules);
    if (validation.fails()) {
      return response.status(400).send(validation.messages());
    }

    const newPassword = request.input("newPassword");
    const confirmPassword = request.input("confirmPassword");

    const user = await User.findByOrFail("email", mailEmail);

    //check token is same or not
    const sameToken = mailToken === user.token;
    if (!sameToken) {
      return response.status(401).json({
        message: "Old token provided or token already used",
      });
    }
    //check token is expired or not
    const expiredToken = moment()
      .subtract(2, "days")
      .isAfter(user.token_created_at);
    if (expiredToken) {
      return response.status.status(401).json({
        message: "Token expired",
      });
    }
    if (newPassword === confirmPassword) {
      user.password = newPassword;
      user.token = null;
      user.token_creeated_at = 0;
    } else {
      response.status(400).send({
        status: "error",
        message: "newPassword and confirmPassword must be same",
      });
    }
    await user.save();
  }
}

module.exports = UserController;
