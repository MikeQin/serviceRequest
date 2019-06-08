//const Joi = require("joi");
const express = require("express");
const app = express();
const customerRoute = require("./routes/customerRoute");
const serviceRequestRoute = require("./routes/serviceRequestRoute");
const mongoose = require("mongoose");
const cors = require('cors');

// Allow cross-origin requests
app.use(cors());

// Connect to Mongo
mongoose.connect(
  "mongodb://localhost:27017/serviceRequests",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    user: "mongo",
    pass: "mongo",
    authSource: "admin"
  },
  (error, db) => {
    if (error) console.log(error);
  }
);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB ...');
});
mongoose.Promise = global.Promise;

// Use Middleware
app.use(express.static("public"));
app.use(express.json()); // equals to body-parser
app.use("/api/customers", customerRoute);
app.use("/api/requests", serviceRequestRoute);
// Error Handler Middleware
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(422).send({ code: err.code, error: err.errmsg });
  }
});

app.get("/", (req, res) => {
  res.send("Service Request App ... powered by Node");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port} ...`));
