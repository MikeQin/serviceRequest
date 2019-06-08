//const Joi = require("joi");
const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/serviceRequest");

router.get("/", (req, res, next) => {
  console.log("GET, /requests");

  if (req.query.customerId) {
    console.log(`req.query.customerId = ${req.query.customerId}`);

    ServiceRequest.find({ customerId: req.query.customerId })
      .then(serviceRequests => {
        res.send(serviceRequests);
      })
      .catch(next);

    return;
  }

  ServiceRequest.find({})
    .then(serviceRequests => {
      res.send(serviceRequests);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  console.log(`GET, /requests/${req.params.id}`);

  ServiceRequest.findById({ _id: req.params.id })
    .then(serviceRequest => {
      res.send(serviceRequest);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  console.log("POST, /requests", req.body);
  ServiceRequest.create(req.body)
    .then(serviceRequest => {
      res.send(serviceRequest);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  console.log(`PUT, /requests/${req.params.id}`);
  ServiceRequest.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      ServiceRequest.findOne({ _id: req.params.id }).then(serviceRequest => {
        res.send(serviceRequest);
      });
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  console.log(`DELETE, /requests/${req.params.id}`);
  ServiceRequest.findByIdAndRemove({ _id: req.params.id })
    .then(serviceRequest => {
      res.send(serviceRequest);
    })
    .catch(next);
});

module.exports = router;
