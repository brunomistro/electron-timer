const { app, BrowserWindow, ipcMain } = require('electron');
const data = require('./data')

app.on('ready', () => {
	console.log("Open App");

	let mainWindow = new BrowserWindow({
		width: 600,
		height: 400
	})

	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => { app.quit(); });

let aboutWindow = null

ipcMain.on('abrir-janela-sobre', () => {
	if(aboutWindow == null){
		aboutWindow = new BrowserWindow({
			width: 300,
			height: 200,
			alwaysOnTop: true,
			frame: false
		});

		aboutWindow.on('closed', () => { aboutWindow = null; })
	}
	
	aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
	console.log(`nome: ${curso}, tempo: ${tempoEstudado}`);
	data.salvaDados(curso, tempoEstudado)
})

ipcMain.on('close-about-window', () => { aboutWindow.close(); })