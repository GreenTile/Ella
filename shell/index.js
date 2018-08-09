const open = document.getElementById('open');
const shell = require('electron').shell;

open.addEventListener('click', function(event){
    shell.showItemInFolder('/home/mohammadbagher/Desktop/Takor.mp3');
    // shell.openItem('/home/mohammadbagher/Desktop/Takor.mp3');
    shell.openExternal('http;//electron.atom.io');
});