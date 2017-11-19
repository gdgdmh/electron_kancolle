'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = require('electron').ipcMain;
var fs = require('fs');
let templateMenu = [
  {
    label: 'Edit',
    submenu: [
      {
        role:'undo',
      },
      {
        role:'redo',
      },
      {
        // キャッシュのクリア
        label: 'cache clear',
        click()
        {
          require('electron').session.defaultSession.clearCache(() => {})
        }
      },
      {
        // 再起動
        label: 'reboot',
        click()
        {
          app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
          app.exit(0)
        }
      },
      {
        label: 'dialog_test',
        click()
        {
          const options = {
            type: 'info',
            title: 'Infomation',
            message: "This is an information dialog",
            buttons: ['Yes', 'No']
          }
          const {dialog} = require('electron')
          dialog.showMessageBox(options, function(response) {

            const Log = require('./lib/log.js');
            var log = new Log("shoma2da");
            console.log(log.toString());            
            // responseに押されたものが返る
            // yesなら0
            // no もしくは cancelなら1
            console.log(response)
            var response_str = "dialog_result=" + response + "\n";
            fs.appendFile(__dirname + '/log.txt', response_str, 'UTF-8', function(err) {
              if (err) {
                // error発生
                console.log(err);
              }
            })
          })
          /*
          ipc.on('open-information-dialog', function(event) {
            const options = {
              type: 'info',
              title: 'Infomation',
              message: "This is an information dialog",
              buttons: ['Yes', 'No']
            }            
            dialog.showMessageBox(options, function(index) {
              event.sender.send('infomaation-dialog-selection', index)
            })
          })
          */
        }
      }
    ]
  }/*,
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        },
      },
      {
        type: 'separator',
      },
      {
        role: 'togglefullscreen',
      }
    ]
  }*/
];



app.on('ready', function () {
  const menu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menu);
});


let mainWindow = null;
 
app.on('window-all-closed', function() {
  // not mac
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
 
app.on('ready', function() {
  // default window size
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
  });
  // first load url
  mainWindow.loadURL(`http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/`);
  //mainWindow.loadURL(`https://www.google.co.jp/`);
  
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


/*
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
 
let mainWindow = null;
 
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
 
app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
 
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
*/

