const {BrowserWindow} = require('electron')
let window

function createWindow() {
    const window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
    window.loadFile('src/index.html');
  
    return window;
  }
  
  module.exports = {
    createWindow
  }

