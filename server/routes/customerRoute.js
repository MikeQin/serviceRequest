//const Joi = require("joi");
const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

router.get("/", (req, res, next) => {
  console.log("GET, /customers");

  Customer.find({})
    .then(customers => {
      res.send(customers);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  console.log(`GET, /customers/${req.params.id}`);

  Customer.findById({ _id: req.params.id })
    .then(customer => {
      res.send(customer);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  console.log("POST, /customers", req.body);
  Customer.create(req.body)
    .then(customer => {
      res.send(customer);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  console.log(`PUT, /customers/${req.params.id}`);
  Customer.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Customer.findOne({ _id: req.params.id }).then(customer => {
        res.send(customer);
      });
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  console.log(`DELETE, /customers/${req.params.id}`);
  Customer.findByIdAndRemove({ _id: req.params.id })
    .then(customer => {
      res.send(customer);
    })
    .catch(next);
});

module.exports = router;
