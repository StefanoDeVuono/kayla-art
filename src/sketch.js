const P5 = require('p5')
const P5Dom = require('p5/lib/addons/p5.dom')
let seconds

const [CANVAS_WIDTH, CANVAS_HEIGHT] = [1280, 720]
const FRAMES_PER_SECOND = 30
const DELAY_IN_SECONDS = 10 * FRAMES_PER_SECOND

if (process.env.NODE_ENV === 'development') {
  seconds = 0
  setInterval(() => {
    console.log(++seconds)
  }, 1000)
}

const sketch = p => {
  let capture
  let frames = []
  let cache = []

  p.setup = () => {
    p.frameRate(FRAMES_PER_SECOND)
    let canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    capture = p.createCapture(p.VIDEO)
    capture.size(CANVAS_WIDTH, CANVAS_HEIGHT)
    capture.hide()
  }

  p.draw = () => {
    p.background(0)
    if (process.env.NODE_ENV === 'development') debugText(p)
    let frame
    if (frames.length === DELAY_IN_SECONDS) {
      frame = frames.shift()
      p.image(frame, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      // p.filter(p.INVERT)
    }
    frames.push(getImage(capture))
  }
}

function getImage(capture) {
  return capture.get(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function debugText(p) {
  p.background(255)
  p.textSize(32)
  // p.text(seconds, (CANVAS_WIDTH - 32) / 2, CANVAS_HEIGHT / 2)
  p.fill(0)
}

new P5(sketch)
