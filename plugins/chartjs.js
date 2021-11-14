const Chart = require('chart.js')
const datalabels = require('chartjs-plugin-datalabels')
const { drawRoundRectangle } = require('~/lib/chart.lib')

Chart.elements.Rectangle.prototype.draw = drawRoundRectangle
Chart.plugins.register(datalabels)

export default ({ app }, inject) => {
  inject('chartjs', {
    createChart (dom, data) {
      const chartIst = new Chart(dom, data)
      if (data.options.customLegend && !!data.options.customLegendId) {
        const customLegendDom = document.getElementById(data.options.customLegendId)
        if (customLegendDom) {
          customLegendDom.innerHTML = chartIst.generateLegend()
        }

        if (data.options.useCustomLegendClick !== false) {
          if (customLegendDom.childElementCount) {
            const customLegendClick = data.options.customLegendClick
            customLegendDom.childNodes.forEach((child) => {
              child.addEventListener("click", customLegendClick.bind(null, chartIst), false)
            })
          }
        }
      }
    }
  })
}
