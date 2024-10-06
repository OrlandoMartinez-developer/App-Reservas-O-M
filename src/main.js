const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { getConection } = require('./database'); // Importar la conexión a la base de datos

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
    width: 1000,
    height: 600,
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
