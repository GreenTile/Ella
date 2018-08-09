// console.log("main process working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const globalShrtct = electron.globalShortcut;
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


app.on('ready', function(){
    createWindow();

    const template = [
        {
            label: 'demo',
            submenu: [
                {
                    label: 'submenu1',
                    click: function(){
                        console.log('submenu 1 clicked');
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'submenu2'
                }
            ]
        },
        {
            label: 'help',
            submenu: [{
                label: 'about',
                click: function(){
                electron.shell.openExternal('http://electronjs.org');
                },
                accelerator: 'CmdOrCtrl + shift + H'
            }]
        },
        {
            label: 'Edit',
            submenu: [
              {role: 'undo'},
              {role: 'redo'},
              {type: 'separator'},
              {role: 'cut'},
              {role: 'copy'},
              {role: 'paste'},
              {role: 'pasteandmatchstyle'},
              {role: 'delete'},
              {role: 'selectall'}
            ]
          }
    ]
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    const contextMenu = new Menu();
    contextMenu.append(new MenuItem({
        label: 'Hello',
        click: function(){
            console.log("context menu Hello clicked");
        }
    }));
    contextMenu.append(new MenuItem({
        role: 'selectall'
    }))

    win.webContents.on('context-menu', function(e,params){
        contextMenu.popup(win, params.x, params.y)
    })

    globalShrtct.register('Alt + 1', function(){
        win.show();
    });
});


app.on('will-quit',function(){
    globalShrtct.unregisterAll();
});

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
