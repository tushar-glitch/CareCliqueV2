const express = require("express");
const auth = require("../middleware/auth");
const rateLimiter = require("../middleware/ratelimiter");
const notificationController = require("../controllers/notificationController");

const notificationRouter = express.Router();

notificationRouter.get(
  "/getallnotifs",
  rateLimiter,
  auth,
  notificationController.getallnotifs
);//

module.exports = notificationRouter;
