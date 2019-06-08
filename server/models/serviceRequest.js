const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Address = new Schema({
  street: {
    type: String,
    required: [true, "street is required"]
  },
  city: {
    type: String,
    required: [true, "city is required"]
  },
  state: {
    type: String,
    required: [true, "state is required"]
  },
  zip: {
    type: Number,
    required: [true, "zip is required"]
  },
});

const ServiceRequestSchema = new Schema({
  type: {
    type: String,
    required: [true, "type is required"]
  },
  description: {
    type: String,
    required: [true, "description is required"]
  },
  address: {
    type: Address,
    required: [true, "address is required"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "open"
  },
  customerId: {
    type: String,
    required: [true, "customerId is required"]
  }
});

const ServiceRequest = mongoose.model("ServiceRequest", ServiceRequestSchema);

module.exports = ServiceRequest;