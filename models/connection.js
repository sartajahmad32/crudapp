const mysql = require("mysql")

//Database connection

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sar"
})

db.connect((err) =>{
    if(err) throw err;
    console.log("MySql connected")
})

module.exports = db