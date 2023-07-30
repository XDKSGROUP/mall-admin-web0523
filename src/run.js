const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({

        width: 800,

        height: 600,

        webPreferences: {

            nodeIntegration: true

        }

    });

    mainWindow.webContents.openDevTools();

    //载入你的HTML5应用的index.html进入
    mainWindow.loadFile('index.html');

    // 关闭窗口后触发退出应用的事件
    mainWindow.on('closed', () => {

        mainWindow = null;

    });

}

// Electron 会触发”ready”事件，表明应用程序已经准备好了。

app.on('ready', createWindow);

// 当所有窗口都已关闭，应用程序将退出。

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {

        app.quit();

    }

});

app.on('activate', () => {

    if (mainWindow === null) {

        createWindow();

    }
});