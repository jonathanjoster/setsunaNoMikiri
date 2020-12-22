let wowAppearing;
let time;
let playing;
let enemyCount = 0;
let dio = false;
let bgColor = 'linear-gradient(rgba(121, 76, 47, 0.8), rgba(255,0,0,0) 60%)';
const textArea = document.getElementById('text-area');
const wow = document.getElementById('wow');
const audio = document.querySelector('audio');
const loadingTime = 2000;

let timerID;
let timeOverID;
const enemyData = [
  ['santa', 2000],
  ['fake', 1000],
  ['galaxy', 800],
  ['jewel', 500],
  ['concrete', 400],
  ['meta', 250],
  ['giygas', 200]
];

function gameOver(msg) {
  if (msg === 'too fast' || msg === 'too slow') {
    // megaman twntwntwn
    document.querySelector('#canvas').style.left = '-620px';
    var circles = createCircle(csWidth/2, csHeight/2, 45);
    setTimeout(function() {
      render(circles);
      audio.play();
    }, 100);
    document.querySelector('#mega').style.opacity = 0;
  }
  // if arg[1], next btn disabled
  showMessage(msg, msg==='too fast'||msg==='too slow');
  clearTimeout(timeOverID);
  clearTimeout(timerID);
  playing = false;
}

function showWow() {
  wow.style.visibility = 'initial';
  wowAppearing = true;
  document.body.style.background = 'white';
  setTimeout(() => {
    if (enemyCount < enemyData.length-1) {
      document.body.style.background = bgColor;
    } else {
      document.body.style.background = 'url("img/giygas.png")';
    }
  }, 50);
  time = (new Date()).getTime();
}

/**
* after '!' appeared, push space key
* @param {key} pushed key
* @return {boolean} whether player won or lost
*/
function mikitta(key) {
  if (wowAppearing || dio) {
    time -= (new Date()).getTime();
    gameOver(
      `<big>Gotcha</big><br>
      Time: ${-time/1000}[s]
      < ${enemyData[enemyCount][1]/1000}`);
    
    // enemy twntwntwn
    var circles = createCircle(csWidth/2, csHeight/2, 45);
    setTimeout(function() {
      render(circles);
      audio.play();
    }, 100);
    document.querySelectorAll('.enemy')[enemyCount].style.opacity = 0;
  } else {
    gameOver('too fast');  
  }
}

function setsunaNoMikiri() {
  playing = true;
  if (enemyCount) {
    document.getElementById(enemyData[enemyCount-1][0]).style.visibility = 'hidden';
  }
  if (enemyCount < enemyData.length-1) {
    document.getElementById(enemyData[enemyCount][0]).style.visibility = 'inherit';
  } else {
    document.querySelector('#text-area').style.color = 'white';
    document.body.style.background = 'url("img/giygas.png")';
  }

  // textArea.innerHTML = '';
  hideMessage();
  wow.style.visibility = 'hidden';
  wowAppearing = false;

  const delay = Math.random()*1000 * 3+1000; // set .5 for debug
  timerID = setTimeout(showWow, delay);
  const enemyWaitTime = enemyData[enemyCount][1];
  timeOverID = setTimeout(gameOver, delay+enemyWaitTime, 'too slow');
  console.log(`delay:${Math.round(delay)}[ms], enemyWaitTime:${enemyWaitTime}`);

  window.addEventListener('keydown', e => {
    if (e.key === ' ' && playing) {
      mikitta();
    }
  });
  document.querySelector('#mega').onclick = () => {
    if (playing) {
      mikitta();
    }
  };
}
setTimeout(setsunaNoMikiri, loadingTime);



// for debug
// push 'N', 'R' and 'Space'
function nextStep() {
  if (enemyCount < enemyData.length-1) {
    enemyCount++;
    setsunaNoMikiri();
  }
}
function init() {
  document.querySelector('#mega').style.opacity = 1;
  document.querySelector('#canvas').style.left = '-80px';
}
document.getElementById('next').addEventListener('click', nextStep);
window.addEventListener('keydown', e => {
  if (e.key === 'n') {
    nextStep();
    init();
  } else if (e.key === 'r') {
    for (let i=0; i<enemyData.length; i++) {
      document.querySelectorAll('.enemy')[i].style.opacity = 1;
    }
    document.querySelectorAll('.enemy')[enemyCount].style.visibility = 'hidden';
    enemyCount=-1; nextStep();
    init();
  } else if (e.key === 'v') {
    dio = true;
    document.body.style.background = 'gold';
    mikitta();
  }
});
