import mongoose from "mongoose";

import CategoryOnline from "../models/categoryOnline.js";
import rc from "../utils/redisServices.js";

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
    let cachedCategories = await rc.get("categoriesOnline");
    
    if (cachedCategories) {
      const categories = JSON.parse(cachedCategories);
      res.status(200).send({
        source: "cache",
        categories,
      });
      return; 
    }

    const dbCategories = await CategoryOnline.find();
    rc.set("categoriesOnline", JSON.stringify(dbCategories), "EX", 3600);
    res.status(200).send({
      source: "db",
      categories: dbCategories,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

export default {
  addCategory,
  getAllCategories,
};
