"use strict";

const Hash = use("Hash");
// const { validateAll } = use('Validator');
const User = use("App/Models/User");
const Mail = use('Mail')

const moment = require('moment')
const crypto = require('crypto')


class UserController {

  //register User
  async register({ request, auth, response }) {
    try {
      const email = request.input("email");
      const password = request.input("password");
      const firstName = request.input("firstName");
      const lastName = request.input("lastName");
      const userExists = await User.findBy("email", email);
      if (userExists) {
        return response.status(400).send({
          status: "error",
          message: "User already registered",
        });
      }
      let user = new User();
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      let success = await user.save();
      return response.status(201).json({
        status: "ok",
        message: "User is registered",
        success: success,
        UserID: user["_id"],
      });
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  //login User

  async login({ request, auth, response }) {
    const email = request.input("email");
    const password = request.input("password");
    try {
      let token = await auth.withRefreshToken().attempt(email, password);
      const user = await User.findBy({email})

      // await auth.login(user)
      // const userInfo = auth.user;
      return response.status(200).json({
        status: "ok",
        message: "User Logged in",
        token: token,
        userInfo: user,
       // user:user
      });
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

    //view user profile

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

  //update user profile

  async updateProfile({ auth, request, response }) {
    try {
      const { firstName, lastName , email} = request.all();
      // const rules = {
      //   firstName: "required",
      //   lastName: "required",
      //   email: "required|emial|unique:users,email"
      // };
      // const validation = await validateAll(request.all(), rules);
      // if (validation.fails()) {
      //   return response.status(400).send(validation.messages());
      // }
      const user = await auth.user;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      await user.save();
      return response.status(200).send(user);
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  //change password of User

  async changePassword({ request, auth, response }) {
    const oldPassword = request.input("oldPassword");
    const newPassword = request.input("newPassword");
    const confirmPassword = request.input("confirmPassword");
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
          message: "password is not updated",
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

    //logout User

  async logout({ request, response, auth }) {
    const refreshToken = request.input("refreshToken");
    if (!refreshToken) {
      // You can throw any exception you want here
      throw BadRequestException.invoke(`Refresh Token missing`);
    }

    await auth.authenticator("jwt").revokeTokens([refreshToken], true);

    return response.send({ status: 200, message: "success" });
  }

  async list({ request, auth, response }) {
    try {
      await auth.check();
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

  async forgotPassword({request, response}) {
    try {
      const { email } = request.only(['email'])
      const user = await User.findByOrFail('email', email)
      const token = await crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      user.token = token

      await user.save()

      await Mail.send('emails.recover', {user, token}, (message) => {
        message
        .from('adilmeman94@gmail.com')
        .to(email)
      })
      return response.status(200).json({
            message: "Success",
          });

    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = UserController;
