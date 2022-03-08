const data = require('./data');
const { ipcMain } = require('electron');

module.exports = {
	templateInicial: null,
	geraTrayTemplate(win){
		let template = [
			{
				'label':'Cursos'
			},
			{
				type: 'separator'
			}
		];
		
		let cursos = data.pegaNomeDosCursos()
		cursos.forEach((item) => {
			let menuItem = {
				label: item,
				type: 'radio',
				click: () => {
					win.send('curso-trocado', item)
				}
			}
			template.push(menuItem)
		})
		this.templateInicial = template
		return template;
	},
	adicionaCursoNoTray(curso, win){
		this.templateInicial.push({
			label: curso,
			type: 'radio',
			checked: true,
			click: () => {
				win.send('curso-trocado', curso)
			}
		})
		return this.templateInicial
	},
	geraMenuPrincipalTemplate(){
		let templateMenu = [
			{
				label: 'View',
				submenu: [
					{ role: 'reload' },
					{ role: 'forcereload'},
					{ role: 'toggledevtools'},
				]
			},
			{
				label: 'Window',
				submenu: [
					{ role: 'minimize'},
					{ role: 'close'}
				]
			},
			{
			label: 'About',
			submenu: [
				{
					label: 'About the timer',
					click: () => { ipcMain.emit('abrir-janela-sobre')},
					accelerator: 'CmdOrCtrl+A'
				}
			]
			}
		]
		return templateMenu
	}
}