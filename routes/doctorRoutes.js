const express = require("express");
const doctorController = require("../controllers/doctorController");
const rateLimiter = require("../middleware/ratelimiter");
const auth = require("../middleware/auth");

const doctorRouter = express.Router();

doctorRouter.get("/getalldoctors", rateLimiter, doctorController.getalldoctors);//

doctorRouter.get("/getnotdoctors", rateLimiter, auth, doctorController.getnotdoctors);

doctorRouter.post("/applyfordoctor", rateLimiter, auth, doctorController.applyfordoctor);

doctorRouter.put("/deletedoctor", rateLimiter, auth, doctorController.deletedoctor);

doctorRouter.put("/acceptdoctor", rateLimiter, auth, doctorController.acceptdoctor);

doctorRouter.put("/rejectdoctor", rateLimiter, auth, doctorController.rejectdoctor);

module.exports = doctorRouter;
