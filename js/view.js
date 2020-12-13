const belts = document.querySelectorAll('.belt');
belts.forEach(e => {
  e.style.height = '20vh';
});
const title = document.querySelector('h1');
title.style.top = 0;

// message
const message = document.querySelector('#text-area');
function showMessage(msg, buttonDisable) {
  message.style.top = 0;
  message.style.opacity = 1;
  textArea.innerHTML = msg;
  // document.querySelector('button#next').disabled = buttonDisable;
  showButton(buttonDisable);
}
function hideMessage() {
  message.style.top = '.5rem';
  message.style.opacity = 0;
  // document.querySelector('button#next').disabled = true;
  hideButton();
}

// next button
const btn = document.querySelector('button#next');
function showButton(btnDisable) {
  btn.style.top = 0;
  if (btnDisable) {
    btn.disabled = true;
  } else {
    btn.style.visibility = 'initial';
    btn.style.opacity = 1;
    btn.disabled = false;
  }
}
function hideButton() {
  btn.style.visibility = 'hidden';
  btn.style.top = '-.5rem';
  btn.style.opacity = 0;
  btn.disabled = true;
}

// loading line
const loadingLine = document.querySelector('.loading-line');
loadingLine.style.width = '100vw';