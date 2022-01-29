const { ipcRenderer, shell } = require('electron');
const process = require('process');

let linkClose = document.querySelector('#link-close');
let linkGithub = document.querySelector('#link-github');
let versionElectron = document.querySelector('#version-electron');

linkGithub.addEventListener('click', () => {
 shell.openExternal("https://github.com/brunomistro")
})

linkClose.addEventListener('click', () => {
	ipcRenderer.send('close-about-window')
})

window.onload = () => {
	versionElectron.textContent = process.versions.electron;
}