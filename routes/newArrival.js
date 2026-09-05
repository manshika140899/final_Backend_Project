const express = require("express");

const {
  getNewArrivals,
  getNewArrivalById,
  createNewArrival,
  updateNewArrival,
  deleteNewArrival,
} = require("../controllers/newArrivalController");

const router = express.Router();


router.get("/", getNewArrivals);


router.get("/:id", getNewArrivalById);


router.post("/", createNewArrival);


router.put("/:id", updateNewArrival);


router.delete("/:id", deleteNewArrival);

module.exports = router;