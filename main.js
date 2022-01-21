const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
	console.log("Open App");

	let mainWindow = new BrowserWindow({
		width: 600,
		height: 400
	})

	mainWindow.loadURL('https://www.github.com/brunomistro')
});