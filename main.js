const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const data = require('./data')
const templateGenerator = require('./template')

let tray = null
let mainWindow = null;
app.on('ready', () => {
	console.log("Open App");

	mainWindow = new BrowserWindow({
		width: 600,
		height: 400
	})

	tray = new Tray(__dirname + '\\app\\img\\icon-tray.png');
	let template = templateGenerator.geraTrayTemplate(mainWindow)
	let trayMenu = Menu.buildFromTemplate(template)
	tray.setContextMenu(trayMenu);

	let templateMenu = templateGenerator.geraMenuPrincipalTemplate()
	let menuPrincipal = Menu.buildFromTemplate(templateMenu)
	Menu.setApplicationMenu(menuPrincipal)

	globalShortcut.register('CmdOrCtrl+Shift+S', () => {
		mainWindow.send('atalho-iniciar-parar')
	})
	
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => { app.quit(); });

ipcMain.on('close-about-window', () => { aboutWindow.close(); })

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

ipcMain.on('curso-adicionado', (event, novoCurso) => {
	let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
	let novoTrayMenu = Menu.buildFromTemplate(novoTemplate)
	tray.setContextMenu(novoTrayMenu)
})
