const mongoose = require("mongoose");

const url = `mongodb+srv://teamyummyindia:RUDRAx9@cluster0.pxnyxus.mongodb.net/yummy_database?retryWrites=true&w=majority`;

//connection database
mongoose
  .connect(url)
  .then((ans) => {
    console.log("Database Connected Successful");
  })
  .catch((err) => {
    console.log("Error in the Database Connection" + err);
  });

//user Schema
const user_Schema = new mongoose.Schema({
  name: { type: String, require: true },
  gender: { type: String, require: true },
  pass: { type: String, require: true },
  gmail: { type: String, require: true },
  phone: { type: String, require: true },
  pin: { type: String, require: true },
  address: { type: String, require: true },
  time: {
    type: String,
    require: true,
  },
  is_Admin: { type: Boolean, require: true, default: false },
});

//item Schema
const item_Shema = new mongoose.Schema({
  item_name: { type: String, require: true },
  current_price: { type: Number, require: true },
  item_image: { type: String, require: true },
  real_price: { type: Number, require: true },
  chef: { type: String, require: true },
  resturant: { type: String, require: true },
  time: {
    type: String,
    default: new Date() + "",
  },
});

//seller Schema
const seller_Shema = new mongoose.Schema({
  seller_name: { type: String, require: true },
  gender: { type: String, require: true },
  resturant_name: { type: String, require: true },
  about: { type: Number, require: true },
  resturant_image: { type: String, require: true },
  address: { type: Number, require: true },
  phone: { type: String, require: true },
  gmail: { type: String, require: true },
  pin: { type: String, require: true },
  orders: { type: Array, require: true },
  gstin: { type: String, require: true },
  time: {
    type: String,
    default: new Date() + "",
  },
});

//

const Users = new mongoose.model("users", user_Schema);
const Items = new mongoose.model("items", item_Shema);
const Sellers = new mongoose.model("sellers", seller_Shema);

module.exports = { Users, Items, Sellers };
