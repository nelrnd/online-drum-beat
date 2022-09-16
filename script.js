const sounds = {
  kick: document.getElementById('kickSound'),
  snare: document.getElementById('snareSound'),
  clap: document.getElementById('clapSound'),
  hihat: document.getElementById('hihatSound'),
  openhat: document.getElementById('openhatSound')
};

function createTable(bars) {
  const table = document.createElement('table');

  for (let sound in sounds) {
    const row = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = sound.toUpperCase();
    th.id = sound;

    th.addEventListener('click', () => {
      sounds[sound].currentTime = 0;
      sounds[sound].play();
    });

    row.appendChild(th);

    for (let i = 0; i < bars; i++) {
      const bar = document.createElement('td');

      bar.addEventListener('click', event => {
        event.target.classList.toggle('full');
      });

      row.appendChild(bar);
    }
    table.appendChild(row);
  }

  document.querySelector('#table-container').appendChild(table);
}

createTable(16);

let currentBar = 1;

showCurrentBar();

const playBtn = document.querySelector('button#play');
let playState;

playBtn.addEventListener('click', () => {
  if (playBtn.firstElementChild.src.includes('play')) {
    playBtn.firstElementChild.src = './pause.svg'

    playState = setInterval(playBar, 180);
  } else {
    playBtn.firstElementChild.src = './play.svg'

    clearInterval(playState);
  }
});

const rewindBtn = document.querySelector('button#rewind');
rewindBtn.addEventListener('click', () => {
  const bar = document.querySelector(`tr:first-of-type td:nth-of-type(${currentBar - 1})`);
  bar.classList.remove('current');

  currentBar = 1;
  showCurrentBar();
})

function playBar() {
  if (currentBar > document.querySelectorAll('tr:first-of-type td').length) {
    currentBar = 1;
  }

  const colBars = document.querySelectorAll(`tr td:nth-of-type(${currentBar})`);

  for (let i = 0; i < colBars.length; i++) {
    const corrSound = document.querySelector(`tr:nth-of-type(${i + 1}) th`).id;
    if (colBars[i].className.includes('full')) {
      sounds[corrSound].currentTime = 0;
      sounds[corrSound].play();

      const box = document.querySelector(`tr:nth-of-type(${i + 1}) th`);
      box.classList.add('active');
      box.addEventListener('transitionend', removeTransition);
    }
  }

  showCurrentBar();

  currentBar++;
}

function removeTransition(event) {
  console.log(event.propertyName);
  event.target.classList.remove('active');
}

function showCurrentBar() {
  // Hide indicator of previous bar
  if (currentBar === 1) {
    document.querySelector('tr:first-of-type td:last-of-type').classList.remove('current');
  } else {
    document.querySelector(`tr:first-of-type td:nth-of-type(${(currentBar - 1)})`).classList.remove('current');
  }
  // Show indicator of current bar
  const bar = document.querySelector(`tr:first-of-type td:nth-of-type(${currentBar})`);
  bar.classList.add('current');
}