const express = require("express");
const mongoConnect = require("./config/db");
const cors = require("cors");
const app = express();
app.use(express.json());
mongoConnect()

app.use(cors());

app.use(express.static("public"));

const home = require("./routes/home");

app.use("/home", home);

const arrival = require("./routes/arrival");

app.use("/arrival", arrival);

const selling = require("./routes/selling");

app.use("/selling", selling);

const browse = require("./routes/browse");

app.use("/browse", browse);

const customer = require("./routes/customer");

app.use("/customer", customer);

const related = require("./routes/related");

app.use("/related", related);

const faqs = require("./routes/faqs");

app.use("/faqs", faqs);

const reviews = require("./routes/reviews");
app.use("/reviews", reviews);

const productInfo = require("./routes/productInfo");

app.use("/productInfo", productInfo);

const categoryProducts = require("./routes/categoryProducts");

app.use("/categoryProducts", categoryProducts);

const filter = require("./routes/filter");

app.use("/filter", filter);

const cart = require("./routes/cart");
app.use("/cart", cart);

const orders = require("./routes/orders"); 

app.use("/orders", orders);


app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});