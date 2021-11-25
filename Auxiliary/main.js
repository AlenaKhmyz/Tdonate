const WIDTH = 740
const HEIGHT = 160
const PADDING = 10
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const ROWS_COUNT = 5
const CIRCLE_RADIUS = 20

function chart(canvas, data) {
  const ctx = canvas.getContext('2d')
  canvas.style.width = WIDTH + 'px'
  canvas.style.height = HEIGHT + 'px'
  canvas.width =  DPI_WIDTH
  canvas.height = DPI_HEIGHT

 const [yMin, yMax] =  computerBoundaries(data)
 

  // === y axis
  const step = VIEW_HEIGHT / ROWS_COUNT
  const textStep = (yMax - yMin) / ROWS_COUNT
  console.log(textStep);

  ctx.beginPath()
  ctx.strokeStyle="#EFF3F9"
  ctx.font = " normal 20px Lato "
  ctx.fillStyle = "#4F4F4F"
  
  for (let i = 1; i <= ROWS_COUNT; i++ ) {
    const y = step * i
    const text = yMax - textStep * i
    ctx.fillText(text.toString(), 5, y + PADDING - 5)
    ctx.moveTo(0, y + PADDING);
    ctx.lineTo(DPI_WIDTH, y + PADDING)
 
  }
  ctx.stroke()
  ctx.closePath()
  //===

  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.lineJoin = 'round'
  ctx.strokeStyle = '#1A76C8'
  for ( const [x, y] of data) {
    ctx.lineTo(x, DPI_HEIGHT - PADDING - y)
  }
 
  ctx.stroke()
  ctx.closePath()

}

chart(document.getElementById('chart'), [
  [0, 55],
  [211, 125],
  [422, 50],
  [633, 240],
  [844, 60],
  [1055, 120],
  [1266, 225],
  [1477, 70]
])

function computerBoundaries(data) {
  let min 
  let max 

  for (const [, y] of data) {
    if(typeof min !== 'number') min = y
    if(typeof max !== 'number') max = y

    if (min > y) min = y
    if (max < y) max = y
  }
    
  return [min, max]
}