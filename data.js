const jsonfile = require('jsonfile-promised');
const fs = require('fs')

module.exports = {
	salvaDados(curso, tempoEstudado){
		let arquivoDoCurso = __dirname + "/data/" + curso + ".json"
		if(fs.existsSync(arquivoDoCurso)){

		}
		else {
			this.criarArquivoDeCurso(arquivoDoCurso, {})
			.then(() => {})
		}
	},
	criarArquivoDeCurso(nomeArquivo, conteudoDoArquivo){
		return jsonfile.writeFile(nomeArquivo, conteudoDoArquivo)
		.then(() => console.log("Arquivo Criado"))
		.catch(err => console.log(err))
	}
}