const express = require("express");
const auth = require("../middleware/auth");
const rateLimiter = require("../middleware/ratelimiter");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/getuser/:id", rateLimiter, auth, userController.getuser);//

userRouter.get("/getallusers", rateLimiter, auth, userController.getallusers);//

userRouter.post("/login", rateLimiter, userController.login);//

userRouter.post("/register", rateLimiter, userController.register);//

userRouter.put("/updateprofile", rateLimiter, auth, userController.updateprofile); //

userRouter.delete("/deleteuser", rateLimiter, auth, userController.deleteuser);

module.exports = userRouter;
