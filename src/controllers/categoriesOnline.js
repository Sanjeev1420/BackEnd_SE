import mongoose from "mongoose";

import ts from "../utils/tokenServices.js";
import CategoryOnline from "../models/categoryOnline.js";

const addCategory = async (req, res) => {
  try {
    const newCategory = req.body;
    const isExistsCategory = await CategoryOnline.findOne({
      categoryName: newCategory.categoryName,
    });
    if (!isExistsCategory) {
      await CategoryOnline.create(newCategory);
      res.status(200).send({
        message: "Category added successfully",
      });
    } else {
      res.status(402).send({
        message: "Category Already exists",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryOnline.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send({
        message: error.message || "Internal Server Error",
    });
  }
};

export default  {
  addCategory,
  getAllCategories
};
