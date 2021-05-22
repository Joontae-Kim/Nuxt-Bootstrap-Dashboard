const Chart = require('chart.js')
const datalabels = require('chartjs-plugin-datalabels')

export default ({ app }, inject) => {
  inject('chartjs', {
    createChart (dom, data) {
      Chart.plugins.register(datalabels)
      // eslint-disable-next-line no-new
      new Chart(dom, data)
    }
  })
}
