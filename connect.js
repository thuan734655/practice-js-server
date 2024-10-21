import mysql from "mysql2";

//setup connect
const connectDb = mysql.createConnection("mysql://ugouay9heqznlxyp:nDjGS9pICZx62tFVNyHz@bxgq4kwpg1zliebh5vvp-mysql.services.clever-cloud.com:3306/bxgq4kwpg1zliebh5vvp");

//connect 
connectDb.connect((err) => {
    if(err) {
        console.log("connect DB fail");
        return;
    }
    console.log("connect db successfull");
})

export default connectDb;