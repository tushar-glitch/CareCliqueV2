const express = require("express");
const auth = require("../middleware/auth");
const appointmentController = require("../controllers/appointmentController");
const rateLimiter = require("../middleware/ratelimiter");
const appointRouter = express.Router();

appointRouter.get(
  "/getallappointments/:id",
  rateLimiter,
  auth,
  appointmentController.getallappointments
);

appointRouter.post(
  "/bookappointment",
  rateLimiter,
  auth,
  appointmentController.bookappointment
);

appointRouter.put("/completed", auth, appointmentController.completed);

module.exports = appointRouter;
