export default ({ app }, inject) => {
  inject('createChartData', {
    line (raw, dataLabels = null) {
      const dataSet = []
      if (!dataLabels) {
        for (const ele of raw) {
          dataSet.push({
            x: Object.keys(ele)[0],
            y: Object.values(ele)[0]
          })
        }
      } else {
        for (const ele of raw) {
          dataSet.push({
            x: ele[dataLabels.x],
            y: ele[dataLabels.y]
          })
        }
      }
      return dataSet
    }
  })
}
