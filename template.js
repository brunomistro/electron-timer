const data = require('./data');

module.exports = {
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

		return template;
	}
}