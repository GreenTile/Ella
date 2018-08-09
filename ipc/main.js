// console.log("main process working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const path = require("path");
const url = require("url");
const dialog = electron.dialog;

let win;

function createWindow(){
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname : path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on('closed', ()=>{
        win =  null;
    });
}

ipc.on('open-error-dialog', function(event){
    dialog.showErrorBox('An error occured','demo of an error message');
    event.sender.send('open-error-dialog', 'Main process opened error dialog');
});
ipc.on('async-message', function(event){
    event.sender.send('async-reply', 'async replied to');
});
ipc.on('sync-message', function(event){
    event.returnValue = 'sync-reply';
})

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () =>{
    if(win === null){
        createWindow();
    }
});
