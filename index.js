var ctx
var canvas
var speed = 10
var x = 0, y = 0
var r1 = 2, r2 = 3
var np1 = 1, np2 = 1
var w = 10, h = 10
var dostep = true
var audioa = new Audio('./2a.mp3');
var audiob = new Audio('./2b.mp3');
var audioc = new Audio('./2c.mp3');
audioa.preload = 'auto';
audiob.preload = 'auto';
audioc.preload = 'auto';
var audios = [audioa, audiob, audioc]

function load() {
  canvas = document.getElementById('polycanvas')
  canvas.style.width = '90vw'
  canvas.style.height = '70vh'
  canvas.width = 2520;
  canvas.height = 2520;
  w = canvas.width * 10 / (window.innerWidth * 0.9)
  h = canvas.height * 10 / (window.innerHeight * 0.7)
  ctx = canvas.getContext("2d");

  const start = document.getElementById('start')
  const stop = document.getElementById('stop')
  let stepinterval = null
  start.addEventListener('click', (event) => {
    audios[2].currentTime = 0;
    audios[2].play();
    dostep = true
    console.log('start!')
    np1 = 1
    np2 = 1
    x = np1 * r1
    y = np2 * r2
  })
  stop.addEventListener('click', (event) => {
    dostep = false
  })
  step()
}

function range1change() {
  const range1 = document.getElementById('range1');
  const range1Label = document.getElementById('label1');
  range1Label.innerText = range1.value;
  r1 = parseInt(range1.value)
  np1 = 1
  np2 = 1
  x = np1 * r1
  y = np2 * r2
}

function range2change() {
  const range2 = document.getElementById('range2');
  const range2Label = document.getElementById('label2');
  range2Label.innerText = range2.value;
  r2 = parseInt(range2.value)
  np1 = 1
  np2 = 1
  x = np1 * r1
  y = np2 * r2
}

function range3change() {
  const range3 = document.getElementById('range3');
  speed = parseInt(range3.value)
}

function clearcanvas() {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawRect(x, y, w, h, color) {

  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

let up = -100, down = -100, left = -100, right = -100, tick = 0

function createHexWithAlpha(hex, alpha) {
  const alphaHex = Math.round(Math.max(0, alpha)).toString(16).padStart(2, '0');
  return hex + alphaHex;
}

function step() {
  if (!dostep) {
    window.requestAnimationFrame(step);
    return
  }
  let audionum = 0
  tick += 1
  clearcanvas()
  i = speed
  while (i--) {
    if (x == 0) {
      np1 *= -1
      left = tick
      audionum += 1
    }
    if (x == canvas.width) {
      np1 *= -1
      right = tick
      audionum += 1
    }
    if (y == 0) {
      np2 *= -1
      up = tick
      audionum += 2
    }
    if (y == canvas.height) {
      np2 *= -1
      down = tick
      audionum += 2
    }
    x += np1 * r1
    y += np2 * r2
    if (audionum > 0) {
      audios[audionum - 1].currentTime = 0;
      audios[audionum - 1].play();
    }
  }
  display()
  window.requestAnimationFrame(step);
}

function display() {
  drawRect(0, 0, w / 2, canvas.height, createHexWithAlpha("#AA0000", 255 * (left + 50 - tick) / 50))
  drawRect(canvas.width - w / 2, 0, w / 2, canvas.height, createHexWithAlpha("#AA0000", 255 * (right + 50 - tick) / 50))
  drawRect(0, 0, canvas.width, h / 2, createHexWithAlpha("#00AAAA", 255 * (up + 50 - tick) / 50))
  drawRect(0, canvas.height - h / 2, canvas.width, h / 2, createHexWithAlpha("#00AAAA", 255 * (down + 50 - tick) / 50))
  drawRect(x - w / 2, y - w / 2, w, h, "#000000")
}
