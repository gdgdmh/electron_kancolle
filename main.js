'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = require('electron').ipcMain;
//var fs = require('fs');
const Log = require('./lib/log.js');
var log = new Log();

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
          const options = {
            type: 'info',
            title: '注意',
            message: "キャッシュのクリアと再起動を行います",
            buttons: ['いいえ', 'はい']
          }
          const {dialog} = require('electron')
          dialog.showMessageBox(options, function(response) {

            // responseに押されたものが返る
            // yesなら0
            // no もしくは cancelなら1
            var response_str = "dialog_result=" + response;
            log.write(response_str);
            if (response == 1) {
              // 再起動
              app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
              app.exit(0)
              electron.session.defaultSession.clearCache(() => {})
            }
          })
        }
      },
      {
        // 再起動
        label: 'reboot',
        click()
        {
          const options = {
            type: 'info',
            title: '注意',
            message: "再起動を行います",
            buttons: ['いいえ', 'はい']
          }
          const {dialog} = require('electron')
          dialog.showMessageBox(options, function(response) {
            // responseに押されたものが返る
            // yesなら0
            // no もしくは cancelなら1
            var response_str = "dialog_result=" + response;
            log.write(response_str);
            if (response == 1) {
              // 再起動
              app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
              app.exit(0)
            }
          })
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
            // responseに押されたものが返る
            // yesなら0
            // no もしくは cancelなら1
            var response_str = "dialog_result=" + response;
            log.write(response_str);
          })
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
  } else {
  }
  log.console('window-all-closed finish');
});

app.on('ready', function() {
  // default window size
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
  });
  // first load url
  //mainWindow.loadURL(`http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/`);
  mainWindow.loadURL(`https://www.google.co.jp/`);
  
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

// URLフックの登録
app.on('ready', function() {

  const {session} = require('electron')
  const filter = {
    urls: ['https://*', 'http://*']
  }

  log.console('ready url register');
  //session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  //})

  session.defaultSession.webRequest.onResponseStarted(filter, (details) => {
    log.console(details.statusCode);
  })

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

