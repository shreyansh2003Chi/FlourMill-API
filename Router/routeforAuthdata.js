const express = require("express");
const router = express.Router();

// Import controller functions for handling customer and provider signup
const customerController = require("../Controller/customers");
const providerController = require("../Controller/providers");

// Route for customer signup
router.route("/signupcustomer").post(customerController);

// Route for provider signup
router.route("/signupprovider").post(providerController);

module.exports = router;
