const express = require("express");
const router = express.Router();

const CategoryProduct = require("../models/CategoryProduct");
const Filter = require("../models/Filter");


const escapeRegex = (value = "") => {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};


router.get("/", async (req, res) => {
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

    res.status(200).json(products);
  } catch (error) {
    console.error("GET CATEGORY PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Unable to load category products",
    });
  }
});


router.get("/filter-options", async (req, res) => {
  try {
    const filter = await Filter.findOne();

    if (!filter) {
      return res.status(404).json({
        message: "Filter options not found",
      });
    }

    res.status(200).json(filter);
  } catch (error) {
    console.error("FILTER OPTIONS ERROR:", error);

    res.status(500).json({
      message: "Unable to load filter options",
    });
  }
});


router.get("/filter", async (req, res) => {
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
      filters: {
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        color: color || null,
        size: size || null,
        dressStyle: dressStyle || null,
        category: category || null,
      },

      count: products.length,

      products,
    });
  } catch (error) {
    console.error("CATEGORY PRODUCT FILTER ERROR:", error);

    res.status(500).json({
      message: "Unable to filter category products",
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
    console.error("GET SALE PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Unable to load sale products",
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await CategoryProduct.findOne({
      id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("GET CATEGORY PRODUCT BY ID ERROR:", error);

    res.status(500).json({
      message: "Unable to load product",
    });
  }
});

module.exports = router;