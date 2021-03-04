import '../globals'
import 'p5/lib/addons/p5.sound'
import * as p5 from 'p5'

const sketch = (p) => {
  const w = window.innerWidth
  const h = window.innerHeight
  let rows = 0
  let cols = 0
  const scale = 25
  let terrain = []
  let flyingSpeed = 0

  // let speedSlider
  // let heightSlider
  // let depthSlider

  //*variable for the audio source
  let sound
  let startButton
  let fft
  p.preload = function preload() {
    //*preload mp3 as the audio source for p5 sound to reference
    // sound = p.loadSound('song.mp3')
  }

  p.setup = function setup() {
    p.createCanvas(w, h, p.WEBGL)

    sound = p.loadSound('song.mp3')
    //*assign amplitude as a new instance of the p5 Amplitude function
    fft = new p5.FFT()

    //*analyze frequency with Fast Fourier Transform algorythm

    //*play sound source
    // sound.play()

    //*set number of columns and rows to width / height divided by the scale of each triangle

    cols = w / scale
    rows = h / scale

    startButton = p.createButton('PLAY')
    startButton.position(10, 10)
    startButton.mousePressed(playSound)
    //*sliders for manipulating the visuals
    // speedSlider = p.createSlider(0, 0.2, 0.004, 0)
    // speedSlider.position(10, 10)
    // speedSlider.style('width', '300px')

    // heightSlider = p.createSlider(-350, 0, -180, 0)
    // heightSlider.position(10, 30)
    // heightSlider.style('width', '300px')

    // depthSlider = p.createSlider(0, 350, 50, 0)
    // depthSlider.position(10, 50)
    // depthSlider.style('width', '300px')

    //*set audio source volume
  }

  const playSound = () => {
    if (sound.isPlaying()) {
      sound.stop()
    } else {
      sound.play()
    }
  }
  p.draw = function draw() {
    //*get analysis from the FFT algorythm
    // fft.smooth(0.7)
    fft.analyze()

    //*get treble and bass energy values from result of analysis
    let treble = fft.getEnergy('treble')
    let bass = fft.getEnergy('bass')

    //*assign energy values to variables to be used in terrain generation
    let depth = -bass * 1.5
    let height = treble * 2.2

    //*alter flyingspeed based on value of slider input
    flyingSpeed -= 0.008
    let yoff = flyingSpeed
    for (let y = 0; y < rows; y++) {
      let xoff = 0
      terrain[y] = []

      for (let x = 0; x < cols; x++) {
        terrain[y][x] = p.map(p.noise(xoff, yoff), 0, 1, height, depth)
        xoff += 0.1
      }
      yoff += 0.1
    }
    p.background('rgb(113, 77, 242)')
    p.stroke(255)

    p.fill(0)

    //* rotate sketch along x axis
    p.rotateX(p.PI / 4)
    //* move sketch to align center after the rotation
    p.translate(-w / 2, -h / 2 + 40)
    //* loop to draw grid of triangles
    for (let y = 0; y < rows - 1; y++) {
      p.beginShape(p.TRIANGLE_STRIP)
      for (let x = 0; x < cols; x++) {
        //* drawing triangles by adding x + y vertex
        p.vertex(x * scale, y * scale, terrain[y][x])
        p.vertex(x * scale, (y + 1) * scale, terrain[y + 1][x])
      }
      p.endShape()
    }
  }
}

export default sketch
