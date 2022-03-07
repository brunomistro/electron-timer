const { ipcRenderer } = require("electron");
const timer = require("./timer");

let linkSobre = document.querySelector("#link-sobre");
let botaoPlay = document.querySelector(".botao-play");
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')

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
	}
	else {
		timer.inciar(tempo)
		play = true
	}

	imgs = imgs.reverse();
	botaoPlay.src = imgs[0];
});
