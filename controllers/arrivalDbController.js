const Arrival = require("../models/Arrival");

// GET ALL ARRIVAL PRODUCTS
const getArrivals = async (req, res) => {
  try {
    const products = await Arrival.find().sort({ id: 1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Get arrivals error:", error);

    res.status(500).json({
      message: "Failed to fetch arrival products",
      error: error.message,
    });
  }
};

// GET SINGLE SELECTED ARRIVAL PRODUCT
const getArrivalById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Arrival.findOne({ id });

    if (!product) {
      return res.status(404).json({
        message: "Arrival product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get arrival by ID error:", error);

    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// CREATE ARRIVAL PRODUCT
const createArrival = async (req, res) => {
  try {
    const {
      id,
      name,
      desc,
      image,
      price,
      oldPrice,
      discount,
      rating,
      colors,
      sizes,
      category,
      badge,
    } = req.body;

    if (!id || !name || !image || price === undefined) {
      return res.status(400).json({
        message: "id, name, image and price are required",
      });
    }

    const existingProduct = await Arrival.findOne({
      id: Number(id),
    });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product with this ID already exists",
      });
    }

    const product = await Arrival.create({
      id: Number(id),
      name,
      desc: desc || "",
      image,
      price: Number(price),
      oldPrice:
        oldPrice !== undefined && oldPrice !== null
          ? Number(oldPrice)
          : null,
      discount: Number(discount) || 0,
      rating: Number(rating) || 0,
      colors: Array.isArray(colors) ? colors : [],
      sizes: Array.isArray(sizes) ? sizes : [],
      category: category || "Arrival",
      badge: badge || "New",
    });

    res.status(201).json({
      message: "Arrival product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create arrival error:", error);

    res.status(500).json({
      message: "Failed to create arrival product",
      error: error.message,
    });
  }
};

// UPDATE ARRIVAL PRODUCT
const updateArrival = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const updateData = {
      ...req.body,
    };

    if (updateData.price !== undefined) {
      updateData.price = Number(updateData.price);
    }

    if (updateData.oldPrice !== undefined) {
      updateData.oldPrice =
        updateData.oldPrice === null
          ? null
          : Number(updateData.oldPrice);
    }

    if (updateData.discount !== undefined) {
      updateData.discount = Number(updateData.discount);
    }

    if (updateData.rating !== undefined) {
      updateData.rating = Number(updateData.rating);
    }

    const product = await Arrival.findOneAndUpdate(
      { id },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Arrival product not found",
      });
    }

    res.status(200).json({
      message: "Arrival product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update arrival error:", error);

    res.status(500).json({
      message: "Failed to update arrival product",
      error: error.message,
    });
  }
};

// DELETE ARRIVAL PRODUCT
const deleteArrival = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Arrival.findOneAndDelete({ id });

    if (!product) {
      return res.status(404).json({
        message: "Arrival product not found",
      });
    }

    res.status(200).json({
      message: "Arrival product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Delete arrival error:", error);

    res.status(500).json({
      message: "Failed to delete arrival product",
      error: error.message,
    });
  }
};

module.exports = {
  getArrivals,
  getArrivalById,
  createArrival,
  updateArrival,
  deleteArrival,
};