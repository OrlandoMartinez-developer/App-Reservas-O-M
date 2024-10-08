const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { getConection } = require('./database'); // Importar la conexión a la base de datos
const bcrypt = require('bcrypt');

// Crear una nueva reservación
ipcMain.handle('create-reservation', async (event, reservationData) => {
  const connection = await getConection(); // Obtener la conexión a la base de datos
  try {
    const query = `
      INSERT INTO reservaciones 
      (maestro, materia, laboratorio, fecha, horaEntrada, horaSalida) 
      VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      reservationData.maestro,
      reservationData.materia,
      reservationData.laboratorio,
      reservationData.fecha,
      reservationData.hora,
      reservationData.horaSalida,
    ];

    // Ejecutar la consulta de inserción
    const [result] = await connection.execute(query, values);
    return result.insertId; // Devuelve el ID de la reservación creada
  } catch (error) {
    throw new Error(`Error al crear la reservación: ${error.message}`);
  }
});

// Obtener todas las reservaciones
ipcMain.handle('getReservations', async () => {
  const connection = await getConection(); // Obtener la conexión a la base de datos
  try {
    const [result] = await connection.execute('SELECT * FROM reservaciones');
    return result; // Devuelve todas las reservaciones
  } catch (error) {
    throw new Error(`Error al obtener reservaciones: ${error.message}`);
  }
});

// Actualizar una reservación
ipcMain.handle('updateReservation', async (event, reservationData) => {
  const connection = await getConection(); // Obtener la conexión a la base de datos
  try {
    const query = `
      UPDATE reservaciones 
      SET maestro = ?, materia = ?, fecha = ?, horaEntrada = ?, horaSalida = ?, laboratorio = ? 
      WHERE id = ?`;
    const values = [
      reservationData.maestro,
      reservationData.materia,
      reservationData.fecha,
      reservationData.horaEntrada,
      reservationData.horaSalida,
      reservationData.laboratorio,
      reservationData.id,
    ];

    const [result] = await connection.execute(query, values);
    return result.affectedRows; // Devuelve el número de filas afectadas
  } catch (error) {
    throw new Error(`Error al actualizar la reservación: ${error.message}`);
  }
});

// Manejar el registro de usuarios
ipcMain.handle('register-user', async (event, userData) => {
  const connection = await getConection(); // Obtener la conexión a la base de datos
  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Insertar los datos en la base de datos
    const query = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
    const values = [userData.username, userData.email, hashedPassword];

    const [result] = await connection.execute(query, values);
    return result.insertId; // Devuelve el ID del usuario creado
  } catch (error) {
    throw new Error(`Error al registrar el usuario: ${error.message}`);
  }
});

// Manejar el inicio de sesión
ipcMain.handle('login-user', async (event, loginData) => {
  const connection = await getConection(); // Obtener la conexión a la base de datos
  try {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await connection.execute(query, [loginData.email]);

    if (rows.length > 0) {
      const user = rows[0];
      // Comparar la contraseña ingresada con la almacenada
      const match = await bcrypt.compare(loginData.password, user.password);
      if (match) {
        return { success: true, userId: user.id }; // Login exitoso
      } else {
        return { success: false, message: 'Contraseña incorrecta' };
      }
    } else {
      return { success: false, message: 'Usuario no encontrado' };
    }
  } catch (error) {
    throw new Error(`Error al iniciar sesión: ${error.message}`);
  }
});

// Eliminar una reservación
ipcMain.handle('deleteReservation', async (event, reservationId) => {
  const connection = await getConection(); // Obtener la conexión a la base de datos
  try {
    const query = 'DELETE FROM reservaciones WHERE id = ?';
    const [result] = await connection.execute(query, [reservationId]);
    return result.affectedRows; // Devuelve el número de filas afectadas
  } catch (error) {
    throw new Error(`Error al eliminar la reservación: ${error.message}`);
  }
});

// Crear ventana principal
const createWindow = () => {
  const win = new BrowserWindow({
    width: 2000,
    height: 2000,
    webPreferences: {
      preload: path.join(__dirname, '../precarga.js') // Carga el script de precarga
    }
  });

  win.loadFile('index.html'); // Cargar el archivo HTML
};

// Inicializar la aplicación cuando esté lista
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong'); // Prueba básica de comunicación
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Cerrar la aplicación cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});