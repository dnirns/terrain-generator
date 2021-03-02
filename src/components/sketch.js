const sketch = (p) => {
  let rotation = 0

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight)
  }

  p.draw = function () {
    if (p.mouseIsPressed) {
      p.fill(0)
    } else {
      p.fill(255)
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80)
  }
}

export default sketch
