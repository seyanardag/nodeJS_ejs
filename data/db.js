
const mysql = require("mysql2");

const dbconfig = require("../config");

const connection = mysql.createConnection(dbconfig);

connection.connect((err)=>{
    if(err){
        console.log("connaction sağlanamadı");
    } else {
        console.log("mysql bağlantısı başarılı");
    }
})

module.exports = connection.promise();