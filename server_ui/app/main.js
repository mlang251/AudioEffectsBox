const {app, BrowserWindow} = require('electron');

let win;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    win = new BrowserWindow({width: 1360, height: 800});
    win.loadURL('file://' + __dirname + '/public/index.html');
    win.webContents.openDevTools();
    win.on('closed', function() {
        win = null;
    });
});