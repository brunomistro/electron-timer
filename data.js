const jsonfile = require('jsonfile-promised');
const fs = require('fs');
const { log } = require('console');

module.exports = {
	salvaDados(curso, tempoEstudado){
		let arquivoDoCurso = __dirname + "/data/" + curso + ".json"
		if(fs.existsSync(arquivoDoCurso)){
			this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado)
		}
		else {
			this.criarArquivoDeCurso(arquivoDoCurso, {})
			.then(() => { this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado) })
		}
	},
	criarArquivoDeCurso(nomeArquivo, conteudoDoArquivo){
		return jsonfile.writeFile(nomeArquivo, conteudoDoArquivo)
		.then(() => console.log("Arquivo Criado"))
		.catch(err => console.log(err))
	},
	adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado){
		let dados = {
			ultimoEstudo: new Date().toString(),
			tempo: tempoEstudado
		}
		jsonfile.writeFile(arquivoDoCurso, dados, {spaces: 2})
		.then(() => console.log("tempo salvo!"))
		.catch(err => console.log(err))
	},
	pegaDados(curso){
		let arquivoDoCurso = __dirname + "/data/" + curso + ".json"
		return jsonfile.readFile(arquivoDoCurso)
	}
}