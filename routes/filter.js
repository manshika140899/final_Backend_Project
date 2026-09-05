const express = require("express");
const router = express.Router();

const Filter = require("../models/Filter");
const CategoryProduct = require("../models/CategoryProduct");


const escapeRegex = (value = "") => {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};


router.get("/", async (req, res) => {
  try {
    const filter = await Filter.findOne();

    if (!filter) {
      return res.status(404).json({
        message: "Filter options not found",
      });
    }

    res.status(200).json(filter);
  } catch (error) {
    console.error("GET FILTER ERROR:", error);

    res.status(500).json({
      message: "Unable to load filters",
    });
  }
});


router.get("/options", async (req, res) => {
  try {
    const filter = await Filter.findOne();

    if (!filter) {
      return res.status(404).json({
        message: "Filter options not found",
      });
    }

    res.status(200).json(filter);
  } catch (error) {
    console.error("GET FILTER OPTIONS ERROR:", error);

    res.status(500).json({
      message: "Unable to load filter options",
    });
  }
});


router.get("/products", async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      color,
      size,
      dressStyle,
      category,
    } = req.query;

    const query = {};


    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }


    if (color) {
      query.colors = {
        $regex: `^${escapeRegex(color)}$`,
        $options: "i",
      };
    }


    if (size) {
      query.sizes = {
        $regex: `^${escapeRegex(size)}$`,
        $options: "i",
      };
    }


    if (dressStyle) {
      query.dressStyle = {
        $regex: `^${escapeRegex(dressStyle)}$`,
        $options: "i",
      };
    }



    if (category) {
      query.category = {
        $regex: `^${escapeRegex(category)}$`,
        $options: "i",
      };
    }

    const products = await CategoryProduct.find(query).sort({
      id: 1,
    });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("FILTER PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Unable to filter products",
    });
  }
});


router.get("/sale", async (req, res) => {
  try {
    const products = await CategoryProduct.find({
      discount: {
        $exists: true,
        $ne: "",
      },
    }).sort({
      id: 1,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("FILTER SALE PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Unable to load sale products",
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      color,
      size,
      dressStyle,
      category,
    } = req.body;

    const query = {};


    if (minPrice !== undefined && minPrice !== "") {
      query.price = {
        ...(query.price || {}),
        $gte: Number(minPrice),
      };
    }

    if (maxPrice !== undefined && maxPrice !== "") {
      query.price = {
        ...(query.price || {}),
        $lte: Number(maxPrice),
      };
    }


    if (color) {
      query.colors = {
        $regex: `^${escapeRegex(color)}$`,
        $options: "i",
      };
    }


    if (size) {
      query.sizes = {
        $regex: `^${escapeRegex(size)}$`,
        $options: "i",
      };
    }


    if (dressStyle) {
      query.dressStyle = {
        $regex: `^${escapeRegex(dressStyle)}$`,
        $options: "i",
      };
    }


    if (category) {
      query.category = {
        $regex: `^${escapeRegex(category)}$`,
        $options: "i",
      };
    }

    const products = await CategoryProduct.find(query).sort({
      id: 1,
    });

    res.status(200).json({
      message: "Products filtered successfully",

      filters: {
        minPrice: minPrice ?? null,
        maxPrice: maxPrice ?? null,
        color: color ?? null,
        size: size ?? null,
        dressStyle: dressStyle ?? null,
        category: category ?? null,
      },

      count: products.length,

      products,
    });
  } catch (error) {
    console.error("POST FILTER ERROR:", error);

    res.status(500).json({
      message: "Unable to apply filters",
    });
  }
});

module.exports = router;