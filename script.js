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

const playBtn = document.querySelector('button#play');

playBtn.addEventListener('click', () => {
  setInterval(playBar, 200);
});

const bars = document.querySelectorAll('td');

bars.forEach(bar => {
  bar.addEventListener('click', event => {
    event.target.classList.toggle('full');
  })
})

const cols = document.querySelectorAll('table col:first-child ~ col');

let currentBar = 1;

/*
function play() {
  if (currentBar > 0) {
    cols[(currentBar - 1)].classList.remove('black');
  } else if (currentBar === 0) {
    cols[(cols.length - 1)].classList.remove('black');
  }

  cols[currentBar].classList.add('black');
  sounds.kick.currentTime = 0;
  sounds.kick.play();
  currentBar++;

  if (currentBar === cols.length) {
    currentBar = 0;
  }
}
*/


function playBar() {
  if (currentBar > 4) {
    currentBar = 1;
  }

  const colBars = document.querySelectorAll(`td:nth-of-type(${currentBar})`);

  for (let i = 0; i < colBars.length; i++) {
    const corrSound = document.querySelector(`tr:nth-of-type(${i + 1}) th`).id;
    if (colBars[i].className === 'full') {
      sounds[corrSound].currentTime = 0;
      sounds[corrSound].play();
    }
  }

  currentBar++;
}