const { ipcRenderer } = require("electron");
const timer = require("./timer");
const data = require("../../data")

let linkSobre = document.querySelector("#link-sobre");
let botaoPlay = document.querySelector(".botao-play");
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')
let botaoAdicionar = document.querySelector('.botao-adicionar')
let campoAdicionar = document.querySelector('.campo-adicionar')

window.onload = () => {
	data.pegaDados(curso.textContent)
	.then((dados) => {
		tempo.textContent = dados.tempo;
	})
}

linkSobre.addEventListener("click", function () {
  ipcRenderer.send("abrir-janela-sobre");
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false;
botaoPlay.addEventListener("click", () => {
	if(play){
		console.log(curso.textContent);
		timer.parar(curso.textContent)
		play = false
		notifica(curso.textContent, 'parado')
	}
	else {
		timer.inciar(tempo)
		play = true
		notifica(curso.textContent, 'iniciado')
	}

	imgs = imgs.reverse();
	botaoPlay.src = imgs[0];
});

const notifica = (curso, state) => {
	new Notification('Timer', {
		body: `O curso ${curso} foi ${state}`,
		icon: state === 'iniciado' ? 'img/play-button.png' : 'img/stop-button.png'
	})
}

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
	data.pegaDados(nomeCurso)
	.then(dados => {tempo.textContent = dados.tempo})
	curso.textContent = nomeCurso;
})

botaoAdicionar.addEventListener('click', () => {
	let novoCurso = campoAdicionar.value
	curso.textContent = novoCurso;
	tempo.textContent = "00:00:00"
	campoAdicionar.value = ""
	ipcRenderer.send('curso-adicionado', novoCurso)
})

ipcRenderer.on('atalho-iniciar-parar', () => {
	let click = new MouseEvent('click')
	botaoPlay.dispatchEvent(click)
})