const sketch = (p) => {
  let rows = 0
  let cols = 0
  const scl = 20
  const w = window.innerWidth
  const h = window.innerHeight
  let speedSlider
  let speed = -0.01

  //2D array where we'll store x and y values for each point on the triangle strip
  let terrain = []
  let flying = 0

  p.setup = function setup() {
    p.createCanvas(w, h, p.WEBGL)

    //set number of columns and rows to width / height divided by the scale of each triangle
    cols = w / scl
    rows = h / scl
    speedSlider = p.createSlider(0.01, 0.08, 0, 0)
    speedSlider.position(10, 10)
    speedSlider.style('width', '300px')
  }

  p.draw = function draw() {
    speed = speedSlider.value()
    flying -= speed
    let yoff = flying
    //setup 2d array to hold x and y values from the previous vertex
    for (let y = 0; y < rows; y++) {
      let xoff = 0
      terrain[y] = []

      for (let x = 0; x < cols; x++) {
        terrain[y][x] = p.map(p.noise(xoff, yoff), 0, 1, -200, 200)
        xoff += 0.1
      }
      yoff += 0.1
    }
    p.background(100)
    p.stroke(255)
    p.fill(0)
    p.frameRate(30)
    //rotate sketch along x axis
    p.rotateX(p.PI / 3)
    //move sketch to align center after the rotation
    p.translate(-w / 2, -h / 2 + 80)
    //loop to draw grid of triangles
    for (let y = 0; y < rows - 1; y++) {
      p.beginShape(p.TRIANGLE_STRIP)
      for (let x = 0; x < cols; x++) {
        //drawing triangles by adding x + y vertex
        p.vertex(x * scl, y * scl, terrain[y][x])
        p.vertex(x * scl, (y + 1) * scl, terrain[y + 1][x])
      }
      p.endShape()
    }
  }
}

export default sketch
