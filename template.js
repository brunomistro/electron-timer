const data = require('./data');

module.exports = {
	geraTrayTemplate(){
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
				type: 'radio'
			}
			template.push(menuItem)
		})

		return template;
	}
}