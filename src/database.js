const mysql = require('mysql2/promise');

// Crear una conexión a la base de datos
async function getConection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // Ajusta el usuario si es necesario
        password: '', // Deja la contraseña vacía si no tienes una
        database: 'unil' // Reemplaza con el nombre de tu base de datos
    });
    return connection;
}

// Exportar la función para usarla en otros archivos
module.exports = { getConection };
