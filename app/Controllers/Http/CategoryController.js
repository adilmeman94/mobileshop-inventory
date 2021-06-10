"use strict";

const Category = use("App/Models/Category");

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  async createCategory({ request, auth, response }) {
    try {
      await auth.check();
      const { name, description, icon } = request.post();
      const categoryExists = await Category.findBy("name", name);
      if (categoryExists) {
        return response.status(400).send({
          status: "error",
          message: `category ${category.name} is already existed`,
        });
      }
      const category = new Category();
      category.name = name;
      category.description = description;
      category.icon = icon;
      await category.save();
      return response.status(201).json({
        message: `category ${category.name} is Created Successfull`,
        data: category,
      });
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  async listCategory({ request, auth, response }) {
    try {
      await auth.check();
      const categories = await Category.all();
      return categories;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async categoryById({ request, auth, response, params }) {
    try {
      await auth.check();
      const id = params._id;
      const categoryById = await Category.findBy("id", id);
      if (!categoryById) {
        return response.status(400).send({
          status: "error",
          message: `category ${category.name} is not existed`,
        });
      }
      return categoryById;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async editCategory({ request, auth, response, params }) {
    try {
      await auth.check();
      const id = params._id;
      const categoryById = await Category.findBy("id", id);

      const { name, description, icon } = request.all();

      const category = await categoryById;
      category.name = name || category.name;
      category.description = description || category.description;
      category.icon = icon || category.icon;

      await category.save();
      return response.status(200).send(category);
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  async deleteCategory({ request, auth, response, params }) {
    try {
      await auth.check();
      const id = params._id;
      const categoryById = await Category.findBy("id", id);
      const category = await categoryById;
      await category.delete();

      return response.status(201).json({
        message: `category ${category.name} is deleted Successfull`,
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

module.exports = CategoryController;
