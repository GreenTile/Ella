// console.log("main process working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win, dimWindow, colorWindow, framelessWindow;
let parentWindow, childWindow;

function createWindow(){
    // win = new BrowserWindow();
    // dimWindow = new BrowserWindow({
    //     width: 400,
    //     height: 400,
    //     maxWidth: 600,
    //     maxHeight: 600
    // });
    // colorWindow = new BrowserWindow({
    //     backgroundColor: '#228b22'
    // });
    // framelessWindow = new BrowserWindow({
    //     backgroundColor: '#800000',
    //     frame: false
    // });
    parentWindow = new BrowserWindow({
        title: 'parent'
    });
    childWindow = new BrowserWindow({
        parent: parentWindow,
        title: 'child',
        show:false,
        modal: true
    });
    childWindow.loadURL('http://instagram.com/abedigram');
    childWindow.once('ready-to-show', ()=>{
        childWindow.show();
    });
}


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
