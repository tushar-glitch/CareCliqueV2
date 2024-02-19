const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const client = require('../db/conn');
require("dotenv").config();
const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    client.query("select * from users", (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(result.rows);
    })
  } catch (error) {
    res.status(500).send("Unable to get all users");
  }
};

const login = async (req, res) => {
  try {
    client.query("select * from users where email = $1 and password = $2", [req.body.email, req.body.password], (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      if (result.rows.length) {
        const token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.JWT_KEY, { expiresIn: "90d" });
        res.status(200).send({ token: token, user: result.rows[0] });
      }
      else {
        res.status(404).send("No user found with these credentials!")
      }
    })
  }
  catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try {
    client.query("select * from users where email = $1", [req.body.email], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (result.rows.length) {
        return res.status(400).send("User already exists");
      }
      else {
        client.query("insert into users (email, password, isAdmin, isDoc) values ($1, $2, $3, $4)", [req.body.email, req.body.password, false, false], (err, req) => {
          if (err) {
            console.log(err);
            res.status(500).send("Something went wrong")
          }
          else {
            res.status(201).send("User registered successfully");
          }
        })
      }
    })
  }
  catch (err) {
    
  }
};

const updateprofile = async (req, res) => {
  console.log('asdf');
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const result = await User.findByIdAndUpdate(
      { _id: req.locals },
      { ...req.body, password: hashedPass }
    );
    if (!result) {
      return res.status(500).send("Unable to update user");
    }
    return res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Unable to update user");
  }
  console.log('asdf');
};

const deleteuser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.body.userId);
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Unable to delete user");
  }
};

module.exports = {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
  deleteuser,
};
