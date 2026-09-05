const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const ordersFile = path.join(__dirname, "../data/orders.json");


const readOrders = () => {
  if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, "[]", "utf-8");
  }

  const data = fs.readFileSync(ordersFile, "utf-8");

  return JSON.parse(data || "[]");
};


const saveOrders = (orders) => {
  fs.writeFileSync(
    ordersFile,
    JSON.stringify(orders, null, 2),
    "utf-8"
  );
};


router.get("/", (req, res) => {
  try {
    const orders = readOrders();

    res.status(200).json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      message: "Failed to get orders",
    });
  }
});


router.get("/:id", (req, res) => {
  try {
    const orders = readOrders();

    const order = orders.find(
      (item) => String(item.id) === String(req.params.id)
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("GET SINGLE ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to get order",
    });
  }
});


router.post("/", (req, res) => {
  try {
    const orders = readOrders();

    const {
      customer,
      products,
      subtotal,
      discount,
      deliveryFee,
      total,
      promoCode,
      paymentMethod,
    } = req.body;


    if (!customer) {
      return res.status(400).json({
        message: "Customer information is required",
      });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }

    if (!customer.firstName) {
      return res.status(400).json({
        message: "First name is required",
      });
    }

    if (!customer.lastName) {
      return res.status(400).json({
        message: "Last name is required",
      });
    }

    if (!customer.email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!customer.phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    if (!customer.address) {
      return res.status(400).json({
        message: "Address is required",
      });
    }


    const orderId = `ORD-${Date.now()}`;


    const newOrder = {
      id: orderId,

      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city || "",
        postalCode: customer.postalCode || "",
        country: customer.country || "Pakistan",
      },

      products: products.map((product) => ({
        productId:
          product.productId ??
          product.id ??
          null,

        name: product.name || "",

        image: product.image || "",

        size: product.size || "",

        color: product.color || "",

        price: Number(product.price) || 0,

        quantity: Math.max(
          1,
          Number(product.quantity) || 1
        ),

        discount: Number(product.discount) || 0,
      })),

      subtotal: Number(subtotal) || 0,

      discount: Number(discount) || 0,

      deliveryFee: Number(deliveryFee) || 0,

      total: Number(total) || 0,

      promoCode: promoCode || "",

      paymentMethod: paymentMethod || "COD",

      orderStatus: "Pending",

      createdAt: new Date().toISOString(),
    };


    orders.push(newOrder);

    saveOrders(orders);

    console.log("=================================");
    console.log("NEW ORDER CREATED");
    console.log("ORDER ID:", newOrder.id);
    console.log("=================================");


    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});

router.put("/:id", (req, res) => {
  try {
    const orders = readOrders();

    const orderIndex = orders.findIndex(
      (item) =>
        String(item.id) === String(req.params.id)
    );

    if (orderIndex === -1) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      ...req.body,

   
      id: orders[orderIndex].id,
    };

    saveOrders(orders);

    res.status(200).json({
      message: "Order updated successfully",
      order: orders[orderIndex],
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to update order",
    });
  }
});


router.delete("/:id", (req, res) => {
  try {
    const orders = readOrders();

    const orderIndex = orders.findIndex(
      (item) =>
        String(item.id) === String(req.params.id)
    );

    if (orderIndex === -1) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const deletedOrder = orders.splice(
      orderIndex,
      1
    )[0];

    saveOrders(orders);

    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to delete order",
    });
  }
});

module.exports = router;