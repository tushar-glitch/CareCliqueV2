const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const client = require("../db/conn");
const jwt = require('jsonwebtoken')

const getallappointments = async (req, res) => {
  try {
    const decode = jwt.decode(req.headers.authorization.split(' ')[1])
    var userid = await client.query("select user_id from users where email = $1", [decode.email]);
    userid = userid.rows[0].user_id
    

  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
};

const bookappointment = async (req, res) => {
  try {
    const decode = jwt.decode(req.headers.authorization.split(' ')[1])
    var userid = await client.query("select user_id from users where email = $1", [decode.email]);
    userid = userid.rows[0].user_id
    var docname = await client.query("select firstname from users inner join doctor on doctor.doc_id = users.user_id where users.user_id = $1", [req.body.doc_id]);
    console.log(userid);
    var userName = await client.query("select firstname from users where user_id = $1", [userid]);
    docname = docname.rows[0].firstname
    // var docname = "asdf"
    userName = userName.rows[0].firstname
    
    console.log(userid + " " + docname + " " + userName);
    client.query("insert into appointment (doc_id, user_id, date, time) values ($1, $2, $3, $4)", [req.body.doc_id, userid, req.body.date, req.body.time], (err, result) => { 
      if (err) {
        console.log(err);
        return;
      }
      const contentforuser = `You booked an appointment with Dr.${ docname } for ${ req.body.date } at ${ req.body.time }`;
      const contentfordoc = `You have an appointment with ${userName} on ${req.body.date} at ${req.body.time}`
      client.query("insert into notification (user_id, read, content) values ($1, $2, $3)", [userid, false, contentforuser])
      client.query("insert into notification (user_id, read, content) values ($1, $2, $3)", [req.body.doc_id, false, contentfordoc])
    })
    res.status(200).send("Appointment booked successfully!")
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

const completed = async (req, res) => {
  try {
    const alreadyFound = await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Completed" }
    );

    const usernotification = Notification({
      userId: req.locals,
      content: `Your appointment with ${req.body.doctorname} has been completed`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const doctornotification = Notification({
      userId: req.body.doctorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
    });

    await doctornotification.save();

    return res.status(201).send("Appointment completed");
  } catch (error) {
    res.status(500).send("Unable to complete appointment");
  }
};

module.exports = {
  getallappointments,
  bookappointment,
  completed,
};
