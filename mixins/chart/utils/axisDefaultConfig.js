// axisDefaultConfig.js
export const ticksFontColor = '#adb5bd'
export const borderDash = [3, 4]
export const zeroLineColor = 'rgba(0, 0, 0, 0.1)'

export const yAxesGridLine = {
  borderDash,
  drawTicks: false,
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
