const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

// =====================================================
// GET ALL CART PRODUCTS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find().sort({
      createdAt: -1,
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error("GET CART ERROR:", error);

    res.status(500).json({
      message: "Failed to get cart",
      error: error.message,
    });
  }
});

// =====================================================
// GET SINGLE CART PRODUCT
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const product = await Cart.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Cart product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("GET SINGLE CART ERROR:", error);

    res.status(500).json({
      message: "Failed to get cart product",
      error: error.message,
    });
  }
});

// =====================================================
// ADD PRODUCT TO CART
// =====================================================

router.getr("/", async (req, res) => {
  try {
    console.log("====================================");
    console.log("🔥 ADD TO CART REQUEST");
    console.log("BODY:", req.body);
    console.log("====================================");

    const {
      productId,
      name,
      image,
      size,
      color,
      price,
      quantity,
      discount,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (
      productId === undefined ||
      productId === null ||
      !name ||
      !image ||
      price === undefined ||
      price === null
    ) {
      return res.status(400).json({
        message:
          "productId, name, image and price are required",
        receivedData: req.body,
      });
    }

    // =================================================
    // CLEAN VALUES
    // =================================================

    const finalPrice = Number(price);

    const finalQuantity = Math.max(
      1,
      Number(quantity) || 1
    );

    const finalDiscount =
      Number(discount) || 0;

    if (Number.isNaN(finalPrice)) {
      return res.status(400).json({
        message: "Price must be a valid number",
        price,
      });
    }

    // =================================================
    // CREATE CART PRODUCT
    // =================================================

    const newProduct = new Cart({
      productId: productId,

      name: String(name),

      image: String(image),

      size: size || "Large",

      color: color || "Green",

      price: finalPrice,

      quantity: finalQuantity,

      discount: finalDiscount,
    });

    console.log(
      "🔥 CART PRODUCT BEFORE SAVE:",
      newProduct
    );

    // =================================================
    // SAVE TO MONGODB
    // =================================================

    const savedProduct =
      await newProduct.save();

    console.log(
      "🔥 CART PRODUCT SAVED:",
      savedProduct
    );

    // =================================================
    // GET UPDATED CART
    // =================================================

    const cart = await Cart.find().sort({
      createdAt: -1,
    });

    // =================================================
    // RESPONSE
    // =================================================

    res.status(201).json({
      message:
        "Product added to cart successfully",

      product: savedProduct,

      cart,
    });
  } catch (error) {
    // =================================================
    // IMPORTANT: SHOW ACTUAL ERROR
    // =================================================

    console.error(
      "===================================="
    );

    console.error(
      "🔥 ADD CART PRODUCT ERROR"
    );

    console.error(
      "MESSAGE:",
      error.message
    );

    console.error(
      "NAME:",
      error.name
    );

    console.error(
      "ERROR:",
      error
    );

    console.error(
      "===================================="
    );

    res.status(500).json({
      message:
        "Failed to add product to cart",

      error: error.message,

      errorName: error.name,
    });
  }
});

// =====================================================
// UPDATE CART PRODUCT
// =====================================================

router.put("/:id", async (req, res) => {
  try {
    const {
      quantity,
      size,
      color,
      image,
    } = req.body;

    const product =
      await Cart.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Cart product not found",
      });
    }

    if (quantity !== undefined) {
      product.quantity = Math.max(
        1,
        Number(quantity) || 1
      );
    }

    if (size !== undefined) {
      product.size = size;
    }

    if (color !== undefined) {
      product.color = color;
    }

    if (image !== undefined) {
      product.image = image;
    }

    const updatedProduct =
      await product.save();

    res.status(200).json({
      message: "Cart product updated",

      product: updatedProduct,
    });
  } catch (error) {
    console.error(
      "UPDATE CART PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update cart product",

      error: error.message,
    });
  }
});

// =====================================================
// DELETE CART PRODUCT
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const product =
      await Cart.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Cart product not found",
      });
    }

    const cart = await Cart.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message:
        "Product removed from cart",

      cart,
    });
  } catch (error) {
    console.error(
      "DELETE CART PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to remove cart product",

      error: error.message,
    });
  }
});

module.exports = router;