require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);


const Home = require("./models/Home");
const Arrival = require("./models/Arrival");
const Selling = require("./models/Selling");
const Browse = require("./models/Browse");
const Customer = require("./models/Customer");
const Review = require("./models/Review");
const ProductInfo = require("./models/ProductInfo");
const FAQ = require("./models/FAQ");
const Related = require("./models/Related");

const CategoryProduct = require("./models/CategoryProduct");
const Filter = require("./models/Filter");


const homeData = require("./data/home.json");
const arrivalData = require("./data/arrival.json");
const sellingData = require("./data/selling.json");
const browseData = require("./data/browse.json");
const customerData = require("./data/customer.json");
const reviewData = require("./data/reviews.json");
const productInfoData = require("./data/productInfo.json");
const faqData = require("./data/faqs.json");
const relatedData = require("./data/related.json");

const categoryProductData = require(
  "./data/categoryProducts.json"
);

const filterData = require(
  "./data/filter.json"
);



const seedDatabase = async () => {
  try {


    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("MongoDB connected successfully");


    console.log("Clearing old data...");

    await Home.deleteMany({});
    await Arrival.deleteMany({});
    await Selling.deleteMany({});
    await Browse.deleteMany({});
    await Customer.deleteMany({});
    await Review.deleteMany({});
    await ProductInfo.deleteMany({});
    await FAQ.deleteMany({});
    await Related.deleteMany({});

    await CategoryProduct.deleteMany({});
    await Filter.deleteMany({});

    console.log("Old data cleared");


    await Home.insertMany(homeData);

    console.log("Home data inserted");


    await Arrival.insertMany(arrivalData);

    console.log("Arrival data inserted");


    await Selling.insertMany(sellingData);

    console.log("Selling data inserted");


    await Browse.insertMany(browseData);

    console.log("Browse data inserted");


    await Customer.insertMany(customerData);

    console.log("Customer data inserted");


    await Review.insertMany(reviewData);

    console.log("Reviews data inserted");


    await ProductInfo.insertMany(productInfoData);

    console.log("Product Info data inserted");


    await FAQ.insertMany(faqData);

    console.log("FAQ data inserted");


    await Related.insertMany(relatedData);

    console.log("Related products inserted");


    await CategoryProduct.insertMany(
      categoryProductData
    );

    console.log(
      "Category Products data inserted"
    );


    await Filter.create(filterData);

    console.log(
      "Filter options inserted"
    );


    console.log(
      "\n========================================"
    );

    console.log(
      "ALL DATA ADDED TO MONGODB SUCCESSFULLY"
    );

    console.log(
      "========================================\n"
    );



    await mongoose.connection.close();

    console.log(
      "MongoDB connection closed"
    );
  } catch (error) {
    console.error(
      "\nSEED DATABASE ERROR:",
      error
    );

    if (
      mongoose.connection.readyState !== 0
    ) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedDatabase();