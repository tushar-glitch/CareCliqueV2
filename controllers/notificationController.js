const Notification = require("../models/notificationModel");
const client = require('../db/conn')
const jwt = require('jsonwebtoken')
const getallnotifs = async (req, res) => {
  try {
    console.log('fasdfsadf');
    const decode = jwt.decode(req.headers.authorization.split(" ")[1])
    const {email} = decode
    var userid = await client.query("select user_id from users where email = $1", [email])
    userid = userid.rows[0].user_id
    console.log(userid);
    client.query("select * from notification where user_id = $1", [userid], (err, result) => {
      console.log(result.rows);
      res.send(result.rows)
    })
  } catch (error) {
    res.status(500).send("Unable to get all notifications");
  }
};

module.exports = {
  getallnotifs,
};
