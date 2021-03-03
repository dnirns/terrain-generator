const sketch = (p) => {
  const w = window.innerWidth
  const h = window.innerHeight
  let rows = 0
  let cols = 0

  const scale = 20

  let terrain = []
  let flyingSpeed = 0

  let speedSlider
  let heightSlider
  let depthSlider

  p.setup = function setup() {
    p.createCanvas(w, h, p.WEBGL)
    //*set number of columns and rows to width / height divided by the scale of each triangle
    cols = w / scale
    rows = h / scale

    //*sliders for manipulating the visuals
    speedSlider = p.createSlider(0, 0.2, 0.004, 0)
    speedSlider.position(10, 10)
    speedSlider.style('width', '300px')

    heightSlider = p.createSlider(-350, 0, -180, 0)
    heightSlider.position(10, 30)
    heightSlider.style('width', '300px')

    depthSlider = p.createSlider(0, 350, 50, 0)
    depthSlider.position(10, 50)
    depthSlider.style('width', '300px')
  }

  p.draw = function draw() {
    flyingSpeed -= speedSlider.value()
    let yoff = flyingSpeed

    for (let y = 0; y < rows; y++) {
      let xoff = 0
      terrain[y] = []

      for (let x = 0; x < cols; x++) {
        terrain[y][x] = p.map(
          p.noise(xoff, yoff),
          0,
          1,
          heightSlider.value(),
          depthSlider.value()
        )
        xoff += 0.1
      }
      yoff += 0.1
    }
    p.background(220)
    p.stroke(255)

    p.fill(0)

    //* rotate sketch along x axis
    p.rotateX(p.PI / 3.5)
    //* move sketch to align center after the rotation
    p.translate(-w / 2, -h / 2 + 50)
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
