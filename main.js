const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data')
const templateGenerator = require('./template')

let tray = null
app.on('ready', () => {
	console.log("Open App");

	let mainWindow = new BrowserWindow({
		width: 600,
		height: 400
	})
	tray = new Tray(__dirname + '\\app\\img\\icon-tray.png');

	let template = templateGenerator.geraTrayTemplate()
	let trayMenu = Menu.buildFromTemplate(template)

	tray.setContextMenu(trayMenu);
	// let trayMenu = Menu.buildFromTemplate([
	// 	{label: 'Cursos'},
	// 	{label: '', type: 'separator'},
	// 	{label: 'Electron', type: 'radio'},
	// 	{label: 'React JS', type: 'radio'},
	// 	{label: 'Java', type: 'radio'},
	// ]);

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