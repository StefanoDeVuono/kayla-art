const P5 = require('p5')
const P5Dom = require('p5/lib/addons/p5.dom')
let seconds

const [CANVAS_WIDTH, CANVAS_HEIGHT] = [640, 360]
// const [CANVAS_WIDTH, CANVAS_HEIGHT] = [320, 180]

const FRAMES_PER_SECOND = 24
const DELAY_IN_SECONDS = 5 * FRAMES_PER_SECOND

if (process.env.NODE_ENV === 'development') {
  seconds = 0
  setInterval(() => {
    console.log(++seconds)
  }, 1000)
}

let capture
let frames = []
let cache = []

const sketch = p => {
  p.setup = () => {
    p.background(255)
    p.frameRate(FRAMES_PER_SECOND)
    let canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    capture = p.createCapture(p.VIDEO)
    capture.size(CANVAS_WIDTH, CANVAS_HEIGHT)
    capture.hide()
  }

  function debugText(p) {
    p.background(255)
    p.textSize(32)
    p.text(seconds, (CANVAS_WIDTH - 32) / 2, CANVAS_HEIGHT / 2)
    p.fill(0)
  }

  p.draw = _ => {
    p.background(0)
    if (process.env.NODE_ENV === 'development') debugText(p)
    let frame
    if (frames.length === DELAY_IN_SECONDS) {
      frame = frames.shift()
      p.image(frame, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      // p.filter(p.INVERT)
    } else {
      // let image = getImage(capture)
      // // cache.push(image)
      // frames.push(image)
      // p.image(capture, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
    let image = getImage(capture)
    frames.push(image)
  }

  const useCache = _ => {
    let frame

    if (cache.length === DELAY_IN_SECONDS * 2) {
      // if cache is too long
      console.log('split cache')

      frames = cache.splice(0, DELAY_IN_SECONDS) // split cache in two [frames, ...restOfCache]
    }

    if (frames.length > 0) {
      // play frames
      console.log('play frames')
      frame = frames.shift()
      p.image(frame, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    } else {
      // play present
      p.image(capture, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      let image = getImage(capture)
      cache.push(image)
    }
  }
}

const useCache = ({}) => {}
const _useCache = ({ p, cache, frames, capture }) => {
  // if (process.env.NODE_ENV === 'development') debugText(p)
  let frame

  if (cache.length === DELAY_IN_SECONDS * 2) {
    // if cache is too long
    // split cache in two [frames, ...restOfCache]
    // frames = cache
    frames = cache.splice(0, DELAY_IN_SECONDS)
  }

  if (frames.length > 0) {
    // play frames
    if (process.env.NODE_ENV === 'development') console.log('play frames')
    frame = frames.shift()
    p.image(frame, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  } else {
    // play present
    if (process.env.NODE_ENV === 'development') console.log('play present')
    p.image(capture, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let image = getImage(capture)
    cache.push(image)
  }
}

const glitchyOverlay = ({ p, frames, capture }) => {
  p.background(0)
  if (process.env.NODE_ENV === 'development') debugText(p)
  let frame
  if (frames.length === DELAY_IN_SECONDS) {
    frame = frames.shift()
    p.image(frame, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // p.filter(p.INVERT)
  } else {
    // let image = getImage(capture)
    // // cache.push(image)
    // frames.push(image)
    // p.image(capture, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
  let image = getImage(capture)
  frames.push(image)
}

const getImage = capture => capture.get(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

new P5(sketch)
