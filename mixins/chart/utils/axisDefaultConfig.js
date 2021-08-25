// axisDefaultConfig.js
const ticksFontColor = '#adb5bd'
const borderDash = [3, 4]

export const yAxesGridLine = {
  borderDash,
  drawTicks: false,
  zeroLineBorderDash: borderDash,
  zeroLineColor: 'rgba(0, 0, 0, 0.1)'
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
