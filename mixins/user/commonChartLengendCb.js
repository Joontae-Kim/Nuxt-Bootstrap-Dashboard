export default {
  methods: {
    commonLegendCb (chart, chartName) {
      const ds = chart.data.datasets[0]
      const labels = chart.data.labels
      const text = ds.data.reduce((legendHtml, data, d) => {
        legendHtml.push(`<div id="${chartName}-legend-${d}"
          data-legend-role="parent" data-legend-parent="${chartName}-legend-${d}"
          data-chart-dataset="0" data-chart-idx="${d}"
          class="d-flex align-items-center user-select-none text-nowrap mb-2 mb-md-0 w-50" style="color:${ds.backgroundColor[d]}; font-size: 0.8rem">
          <span class="legend-dot legend-dot--circle" style="background-color:${ds.backgroundColor[d]}"></span>
          <span class="ml-2">${labels[d]}</span>
        </div>`)
        return legendHtml
      }, [])
      return text.join("")
    }
  }
}
