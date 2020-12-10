let wowAppearing;
let time;
let playing;
let enemyCount = 0;
const textArea = document.getElementById('text-area');
const wow = document.getElementById('wow');

let timerID;
let timeOverID;
const enemyData = [
  ['santa', 2000],
  ['fake', 1000],
  ['galaxy', 800],
  ['jewel', 500],
];

function gameOver(msg) {
  if (msg !== 'ok') {
    textArea.innerText = msg;
  }
  clearTimeout(timeOverID);
  clearTimeout(timerID);
  playing = false;
}

function showWow() {
  wow.style.visibility = 'initial';
  wowAppearing = true;
  time = (new Date()).getTime();
}



/**
* after '!' appeared, push space key
* @param {key} pushed key
* @return {boolean} whether player won or lost
*/
function mikitta(key) {
  if (key === ' ' && playing) {
    if (wowAppearing) {
      gameOver('ok');
      time -= (new Date()).getTime();
      textArea.innerHTML =
        '<big>Gotcha</big><br>Time: ' +
        -time/1000 + '[s]' +
        ' <' + enemyData[enemyCount][1]/1000;

      // twntwntwn
      var circles = createCircle(csWidth/2, csHeight/2, 45);
      setTimeout(function() {
          render(circles);
      }, 100);
      document.querySelectorAll('.enemy')[enemyCount].style.opacity = 0;

      return true;
    }
    gameOver('too fast');  
  }
  return false;
}

function setsunaNoMikiri() {
  playing = true;
  if (enemyCount) {
    document.getElementById(enemyData[enemyCount-1][0]).style.visibility = 'hidden';
  }
  document.getElementById(enemyData[enemyCount][0]).style.visibility = 'inherit';

  textArea.innerHTML = '';
  wow.style.visibility = 'hidden';
  wowAppearing = false;

  const delay = Math.random()*1000 * .5; // delay time. change this
  timerID = setTimeout(showWow, delay);
  const enemyWaitTime = enemyData[enemyCount][1];
  timeOverID = setTimeout(gameOver, delay+enemyWaitTime, 'time over');
  console.log(`delay:${delay}, enemyWaitTime:${enemyWaitTime}`);

  window.addEventListener('keydown', e => {
    if (mikitta(e.key)) {
      switch (enemyCount) {
        case 0:
          document.querySelectorAll('span.lost-show').forEach(el => {
            el.style.visibility = 'initial';
          });
          break;
        default: break;
      }
    }
  });
}
setsunaNoMikiri();



// for debug
// push 'N', 'R' and 'Space'
function nextStep() {
  if (enemyCount < enemyData.length-1) {
    enemyCount++;
    setsunaNoMikiri();
  }
}
document.getElementById('next').addEventListener('click', nextStep);
window.addEventListener('keydown', e => { if (e.key === 'n') { nextStep(); } });
window.addEventListener('keydown', e => { if (e.key === 'r') { enemyCount=-1; nextStep(); } });