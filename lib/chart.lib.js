// chart.lib.js

/**
 * Chart Global Configuration Variables
 */

export const yAxesBorderColor = 'rgb(255 255 255 / 0%)'
export const ticksFontColor = '#adb5bd'
export const borderDash = [3, 4]
export const zeroLineColor = 'rgba(0, 0, 0, 0.1)'
export const tooltipValueFontColor = '#495057' // '#6c757d'
export const tooltipStyleObj = {
  xPadding: 12,
  yPadding: 10,
  caretSize: 7,
  backgroundColor: '#fff',
  borderColor: 'rgb(216, 226, 239)',
  borderWidth: 1,
  titleFontSize: 16,
  titleMarginBottom: 10,
  bodyFontSize: 14,
  titleFontColor: '#343a40'
}

export const yAxesGridLine = {
  borderDash,
  drawTicks: false,
  drawBorder: false,
  zeroLineBorderDash: borderDash,
  zeroLineColor
}

export const yAxesTicks = {
  padding: 15,
  fontColor: ticksFontColor
}

export const xAxesGridLine = {
  display: false
}

export const xAxesTicks = Object.freeze({
  padding: 4,
  fontColor: ticksFontColor
})

export const pointConfig = {
  pointRadius: 3,
  pointHoverRadius: 5,
  pointBorderWidth: 2,
  pointHoverBorderWidth: 3,
  pointBackgroundColor: 'white',
  pointHoverBackgroundColor: 'white'
}

// Draw Rectangle to be round corner
export const drawRoundRectangle = function () {
  const ctx = this._chart.ctx
  const vm = this._view
  let left, right, top, bottom, signX, signY, borderSkipped, radius
  let borderWidth = vm.borderWidth
  let cornerRadius = this._chart.config.options.elements.rectangle.borderRadius
  cornerRadius = !cornerRadius ? 15 : cornerRadius

  if (!vm.horizontal) {
    // bar
    left = vm.x - vm.width / 2
    right = vm.x + vm.width / 2
    top = vm.y
    bottom = vm.base
    signX = 1
    signY = bottom > top ? 1 : -1
    borderSkipped = vm.borderSkipped || 'bottom'
  } else {
    // horizontal bar
    left = vm.base
    right = vm.x
    top = vm.y - vm.height / 2
    bottom = vm.y + vm.height / 2
    signX = right > left ? 1 : -1
    signY = 1
    borderSkipped = vm.borderSkipped || 'left'
  }

  // Canvas doesn't allow us to stroke inside the width so we can
  // adjust the sizes to fit if we're setting a stroke on the line
  if (borderWidth) {
    // borderWidth shold be less than bar width and bar height.
    const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom))
    borderWidth = borderWidth > barSize ? barSize : borderWidth
    const halfStroke = borderWidth / 2
    // Adjust borderWidth when bar top position is near vm.base(zero).
    const borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0)
    const borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0)
    const borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0)
    const borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0)
    // not become a vertical line?
    if (borderLeft !== borderRight) {
      top = borderTop
      bottom = borderBottom
    }
    // not become a horizontal line?
    if (borderTop !== borderBottom) {
      left = borderLeft
      right = borderRight
    }
  }

  ctx.beginPath()
  ctx.fillStyle = vm.backgroundColor
  ctx.strokeStyle = vm.borderColor
  ctx.lineWidth = borderWidth

  // Corner points, from bottom-left to bottom-right clockwise
  // | 1 2 |
  // | 0 3 |
  const corners = [
    [left, bottom],
    [left, top],
    [right, top],
    [right, bottom]
  ]

  // Find first (starting) corner with fallback to 'bottom'
  const borders = ['bottom', 'left', 'top', 'right']
  let startCorner = borders.indexOf(borderSkipped, 0)
  if (startCorner === -1) {
    startCorner = 0
  }

  function cornerAt (index) {
    return corners[(startCorner + index) % 4]
  }

  // Draw rectangle from 'startCorner'
  let corner = cornerAt(0)
  ctx.moveTo(corner[0], corner[1])

  for (let i = 1; i < 4; i++) {
    corner = cornerAt(i)
    // let nextCornerId = i + 1
    // if (nextCornerId === 4) {
    //   nextCornerId = 0
    // }

    // const nextCorner = cornerAt(nextCornerId)
    const width = corners[2][0] - corners[1][0]
    const height = corners[0][1] - corners[1][1]
    const x = corners[1][0]
    const y = corners[1][1]

    radius = cornerRadius

    // Fix radius being too large
    const fixRadiusRate = 1.9 // original: 2
    if (radius > height / fixRadiusRate) {
      radius = height / fixRadiusRate
    } else if (radius > (width / fixRadiusRate)) {
      radius = width / fixRadiusRate
    }

    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
  }

  ctx.fill()
  if (borderWidth) {
    ctx.stroke()
  }
}

// Custom Tooltip function
export function customTooltipsGenerator (tooltipModel) {
  // Tooltip Element
  const chartId = this._chart.canvas.id
  let tooltipEl = document.getElementById(`${chartId}-tooltip`)

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.id = `${chartId}-tooltip`
    tooltipEl.innerHTML = '<table></table>'
    tooltipEl.classList.add('chartTooltip')
    document.body.appendChild(tooltipEl)
  }

  // Hide if no tooltip
  if (tooltipModel.opacity === 0 || tooltipEl.classList.contains('active')) {
    tooltipEl.classList.remove('active')
    return
  }

  function getBody (bodyItem) {
    return bodyItem.lines
  }

  // Set Text
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || []
    const bodyLines = tooltipModel.body.map(getBody)

    let innerHtml = '<thead>'

    titleLines.forEach(function (title) {
      innerHtml += '<tr><th>' + title + '</th></tr>'
    })
    innerHtml += '</thead><tbody>'

    bodyLines.forEach(function (body, i) {
      const colors = tooltipModel.labelColors[i]
      let style = 'background:' + colors.backgroundColor // rgb(255, 255, 255)
      style += '; border-color:' + colors.borderColor // rgb(216, 226, 239)
      const span = '<span style="' + style + '"></span>'
      innerHtml += '<tr><td>' + span + body + '</td></tr>'
    })
    innerHtml += '</tbody>'

    const tableRoot = tooltipEl.querySelector('table')
    tableRoot.innerHTML = innerHtml
  }

  // `this` will be the overall tooltip;
  const chartPosition = this._chart.canvas.getBoundingClientRect()

  // Compute X-axis distance
  const distanceToisLeft = tooltipModel.x + tooltipModel.width < chartPosition.width - tooltipModel.width
  const distanceToRight = tooltipModel.x > tooltipModel.width + (tooltipModel.width * 0.5)
  const isCenter = distanceToisLeft && distanceToRight

  // Compute Y-axis distance
  const tootipVerticalMiddle = tooltipModel.y - tooltipModel.height / 2
  const distanceYCommonCompute = tootipVerticalMiddle - tooltipModel.height
  const distanceToTop = Math.abs(distanceYCommonCompute - 10)
  const distanceToisBottom = Math.abs(distanceYCommonCompute + 10)

  // Set the Position Style variables - top, left
  const [topDefaultPosition, leftDefaultPosition] = [
    chartPosition.y + window.pageYOffset + tooltipModel.caretY,
    chartPosition.x + window.pageXOffset + tooltipModel.caretX
  ]

  tooltipEl.style.top = distanceToTop < distanceToisBottom
    ? `${(topDefaultPosition - 10) - (tooltipModel.height + (tooltipModel.height * 0.5))}px`
    : `${topDefaultPosition + 10}px`
  tooltipEl.style.left = isCenter
    ? `${leftDefaultPosition - (tooltipModel.width * 0.55)}px`
    : distanceToisLeft
      ? `${leftDefaultPosition}px`
      : `${leftDefaultPosition - tooltipModel.width - 10}px`
  tooltipEl.classList.add('active')
}

/**
 * Chart Datalabels Global Configuration Variables
 */

export const datalabelsFontSize = 11
export const datalabelsFontColor = '#fff'
export const datalabelsCircleRadius = 16 // 25
export const datalabelsCircleLabel = function () {
  return {
    borderWidth: 2,
    borderRadius: datalabelsCircleRadius,
    borderColor: datalabelsFontColor,
    color: datalabelsFontColor,
    font: {
      padding: 5,
      size: datalabelsFontSize
    },
    padding: 6
  }
}
