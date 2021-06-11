"use strict";

const Category = use("App/Models/Category");

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  async createCategory({ request, auth, response }) {
    try {
      await auth.check();
      const { name, description, icon, parent_id } = request.all();
      const categoryExists = await Category.findBy("name", name);
      if (categoryExists) {
        return response.status(400).send({
          status: "error",
          message: `category is already existed`,
        });
      }
      const category = new Category();
      category.name = name;
      category.description = description;
      category.icon = icon;
      category.parent_id = parent_id;
      await category.save();
      return response.status(201).json({
        message: `category ${category.name} is Created Successfully`,
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
      const id = params.id;
      const category = await Category.findOrFail(id);
      return category;
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `category is not exist`,
      });
    }
  }

  async editCategory({ request, auth, response, params }) {
    try {
      await auth.check();
      const id = params.id;
      const category = await Category.findBy("_id", id);
      if (!category) {
        return response.status(400).send({
          status: "error",
          message: `category is not exist`,
        });
      }

      const { name, description, icon } = request.all();
      category.name = name;
      category.description = description;
      category.icon = icon;
      await category.save();
      return response.status(200).send(category);
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `category is not exist`,
      });
    }
  }

  async deleteCategory({ request, auth, response, params }) {
    try {
      await auth.check();
      const id = params.id;
      const category = await Category.findBy("_id", id);
      await category.delete();
      return response.status(201).json({
        message: `category ${category.name} is deleted Successfull`,
      });
    } catch (error) {
      response.status(400).send({
        status: "error",
        message: `category is not exist`,
      });
    }
  }
}

module.exports = CategoryController;
