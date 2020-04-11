const express = require("./server");
const electron = require("electron");
const path = require('path');
const iconPath = path.join(__dirname, "build", "icon.png");

const app = electron.app;
const BrowserWindow  = electron.BrowserWindow;

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