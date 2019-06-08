const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"]
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"]
  },
  email: {
    type: String,
    required: [true, "email is req,uired"]
  },
  phone: {
    type: String,
    required: [true, "phone is required"]
  },
  wechat: {
    type: String,
    required: [false, "wechat is optional"]
  }
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;