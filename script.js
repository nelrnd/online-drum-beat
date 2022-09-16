const buttons = {
  kick: document.getElementById('kick'),
  snare: document.getElementById('snare'),
  clap: document.getElementById('clap'),
  hihat: document.getElementById('hihat'),
  openhat: document.getElementById('openhat')
};

const sounds = {
  kick: document.getElementById('kickSound'),
  snare: document.getElementById('snareSound'),
  clap: document.getElementById('clapSound'),
  hihat: document.getElementById('hihatSound'),
  openhat: document.getElementById('openhatSound')
};

for (let button in buttons) {
  buttons[button].addEventListener('click', event => {
    sounds[event.target.id].currentTime = 0;
    sounds[event.target.id].play();
  })
}