const express = require("express");
const cors = require("cors");
require("dotenv").config();
const client = require("./db/conn");
const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const path = require("path");
const notificationRouter = require("./routes/notificationRouter");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: true
}))
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);
// app.use(express.static(path.join(__dirname, "./client/build")));
app.get('/', (req, res) => {
  client.query("select * from users", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('result.rows');
    res.send(result.rows);
  })
})
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
const createTableusercommand = "create table users (user_id serial primary key, firstname varchar(50) not null, lastname varchar(50) not null, email varchar(100) not null, password varchar(20) not null, isAdmin boolean not null, isDoc boolean not null, age int not null, gender varchar(20) not null, mobile bigint not null, pic varchar(255) not null);"
const insertintouser = "insert into users(firstname, lastname, email, password, isAdmin, isDoc, age, gender, mobile, pic) values ('Tushar', 'Chauhan', 'tushar@gmail.com', 'tushar@123', true, false, 23, 'M', 9897989798, 'pic')"
app.listen(port, () => {});
// race condition - no simultaneous booking
// redis
// messaging queues
// api rate limiting