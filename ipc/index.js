const electron = require('electron');

const ipc = electron.ipcRenderer;

const errorBtn = document.getElementById('errorBtn');
const asyncMessage = document.getElementById('asyncMessage');
const syncMessage = document.getElementById('syncMessage');

errorBtn.addEventListener('click', function(){
    ipc.send('open-error-dialog');
});
asyncMessage.addEventListener('click', function(){
    console.log('async msg 1');
    ipc.send('async-message');
    console.log('async msg 2');
});
syncMessage.addEventListener('click', function(){
    console.log('sync msg 1');
    const reply = ipc.sendSync('sync-message');
    console.log(reply);
    console.log('sync msg 2');
});

ipc.on('open-error-dialog', function(event, arg){
    console.log(arg);
});
ipc.on('async-reply', function(event, arg){
    console.log(arg);
});


const BrowserWindow = electron.remote.BrowserWindow;
let window = new BrowserWindow();
window.loadURL('http://instagram.com/abedigram');