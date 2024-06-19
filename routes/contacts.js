const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contacts");

router.post("/msg", contactController.contact);


module.exports = router;
