var pg = require('pg');
require('dotenv').config()
var client = new pg.Client(process.env.DB_CONNECTION_STRING);
client.connect(function (err) {
    if (err) {
        return console.error('could not connect to postgres', err);
    }
    console.log('Database connected!');
    // client.query("insert into issues (name) values ('tushar');", function (err, result) {
    //     if (err) {
    //         return console.error('error running query', err);
    //     }
    //     console.log(result.rows);
    //     // client.end();
    // });
});
module.exports = client