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
  play();
});

window.addEventListener('keydown', event => {
  if (event.keyCode === 32 && document.activeElement != playBtn) {
    play();
  }
});

function play() {
  if (playBtn.firstElementChild.src.includes('play')) {
    playBtn.firstElementChild.src = './icons/pause.svg';
    playBar();
    playState = setInterval(playBar, convertBpm(bpmValue));
  } else {
    playBtn.firstElementChild.src = './icons/play.svg';
    clearInterval(playState);
  }
}

function convertBpm(bpm) {
  return (60000 / bpm) / 4;
}

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

const clearBtn = document.querySelector('button#clear');
clearBtn.addEventListener('click', clearTable);

function clearTable() {
  const bars = document.querySelectorAll('td');
  bars.forEach(bar => bar.classList.remove('full'));
}

const bpmBtn = document.querySelector('.bpm-container');
let bpmValue = Number(document.querySelector('#bpm-value').textContent);

const yPosition = {start: null, new: null}

bpmBtn.addEventListener('mousedown', event => {
  if (event.button === 0) {
    yPosition.start = event.clientY;
    window.addEventListener('mousemove', changeBpmValue);
  }
});

function changeBpmValue(event) {
  if (event.buttons === 0) {
    window.removeEventListener('mousemove', changeBpmValue);
  } else {
    yPosition.new = yPosition.start - event.clientY;

    if (yPosition.new > 0) {
      bpmValue++;
    } else if (yPosition.new < 0) {
      bpmValue--;
    }

    document.querySelector('#bpm-value').textContent = bpmValue;

    yPosition.start = event.clientY;
    yPosition.new = null;

    // If currently playing while changing bpm
    // Change bpm while playing
    if (playBtn.firstElementChild.src.includes('pause')) {
      clearInterval(playState);
      playState = setInterval(playBar, convertBpm(bpmValue));
    }
  }
}