const P5 = require('p5')
const P5Dom = require('p5/lib/addons/p5.dom')

if (process.env.NODE_ENV === 'development') {
  let seconds = 0
  let interval = setInterval(() => {
    console.log(++seconds)
  }, 1000)
}

const sketch = p => {
  let capture
  let frames = []

  const [CANVAS_WIDTH, CANVAS_HEIGHT] = [320, 240]
  const FRAMES_PER_SECOND = 60
  const DELAY_IN_SECONDS = 60 * FRAMES_PER_SECOND

  p.setup = () => {
    let canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    capture = p.createCapture(p.VIDEO)
    capture.size(CANVAS_WIDTH, CANVAS_HEIGHT)
    capture.hide()
  }

  p.draw = () => {
    p.background(0)
    let frame
    if (frames.length === DELAY_IN_SECONDS) {
      frame = frames.shift()
      p.image(frame, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      p.filter(p.INVERT)
    }
    frames.push(getImage(capture))
  }
}

function getImage(capture) {
  return capture.get(0, 0, 320, 240)
}

new P5(sketch)
