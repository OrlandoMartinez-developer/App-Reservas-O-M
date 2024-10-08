const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    createReservation: (reservationData) => ipcRenderer.invoke('create-reservation', reservationData),
    getReservations: () => ipcRenderer.invoke('getReservations'),
    registerUser: (userData) => ipcRenderer.invoke('register-user', userData),
    loginUser: (loginData) => ipcRenderer.invoke('login-user', loginData),
    updateReservation: (reservationData) => ipcRenderer.invoke('updateReservation', reservationData),
    deleteReservation: (reservationData) => ipcRenderer.invoke('deleteReservation', reservationData),
  });
