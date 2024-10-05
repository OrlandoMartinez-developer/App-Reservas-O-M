const mysql = require("promise-mysql")

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'unil'
})

function getConection(){
    return conection
}
module.exports = {getConection}