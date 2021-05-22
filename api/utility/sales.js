function mergeSalesAndDate (sales, dates) {
  const merged = dates.reduce((mergedSales, date, d) => {
    mergedSales.push({ [date]: sales[d] })
    return mergedSales
  }, [])
  return merged
}

module.exports = {
  mergeSalesAndDate
}
