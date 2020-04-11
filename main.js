const express = require("./server");
const {app, Menu, BrowserWindow} = require("electron");
const path = require('path');
const iconPath = path.join(__dirname, "build", "icon.png");

let mainWindow;

const createWindow = () => {
    express;
    mainWindow = new BrowserWindow({ 
        width: 900,
        height: 680,
        icon: iconPath
    });
//     mainWindow.setMenuBarVisibility(false)
    mainWindow.loadURL("http://localhost:3002")
    mainWindow.on("closed", () => (mainWindow = null));
}

app.allowRendererProcessReuse = true
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { 
        label: 'Tentang',
        role: 'about'
        },
      { type: 'separator' },
      { 
          label: 'Keluar',
          role: 'quit'
        }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      isMac ? { label: 'Tutup', role: 'close' } : { label: 'Keluar', role: 'quit' },
      { 
        label: 'Muat Ulang',
        role: 'reload'
     },
    ]
  },
  {
    label: 'Tentang',
    role: 'help',
    submenu: [
    {
        label: 'URL Backend',
        click: async () => {
            const prompt = require('electron-prompt');

            const url = await mainWindow.webContents.executeJavaScript('localStorage.getItem("url");', true)
              .then((result) => {
                return result 

            })
            
            prompt({
                title: 'URL Backend',
                label: 'Silahkan masukan URL Backend:',
                value: url,
                inputAttrs: {
                    type: 'url'
                },
                type: 'input'
            })
            .then((r) => {
                if(r === null) {
                    console.log('user cancelled');
                } else {

                    mainWindow.webContents.executeJavaScript(`localStorage.setItem("url", "${r}");`, true)
                        .then((result) => { 
                            mainWindow.loadURL("http://localhost:3002")
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
            .catch(console.error);
        }
    },
      {
        label: 'Bantuan',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/kasirkita/Kasir-Kita')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)