// console.log("main process working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Tray = electron.Tray;
const iconPath = path.join(__dirname, 'logo.jpg');
let win;




app.on('ready', function(){
    new Tray(iconPath);
});

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () =>{
    if(win === null){
    }
});
