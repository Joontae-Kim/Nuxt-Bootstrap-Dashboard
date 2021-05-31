const findArrayByOperator = (() => {
  const namespace = (nsString) => {
    let parts = nsString.split('.')
    let parent = findArrayByOperator
    let i

    // 처음에 중복되는 전역 객체명은 제거한다.
    if (parts[0] === 'ClusterWork') {
      parts = parts.slice(1)
    }

    for (i = 0; i < parts.length; i++) {
      // 프로퍼티가 존재하지 않으면 생성한다.
      if (typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = {}
      }
      parent = parent[parts[i]]
    }
    return parent
  }

  function search (array, condition, property, value) {
    let searched = []
    value = Number(value)
    if (condition === 'st') {
      searched = byST(array, property, value)
    } else if (condition === 'eq') {
      searched = byEQ(array, property, value)
    } else {
      searched = byGT(array, property, value)
    }
    return searched
  }

  function byST (array, property, value) {
    return array.filter((item) => {
      return item[property] <= value
    })
  }

  function byEQ (array, property, value) {
    return array.filter((item) => {
      return item[property] === value
    })
  }

  function byGT (array, property, value) {
    return array.filter((item) => {
      return item[property] >= value
    })
  }

  function partialInclude (target, comparison) {
    return target.some((element) => {
      return comparison.includes(element)
    })
  }

  return {
    namespace,
    ByST: byST,
    ByEQ: byEQ,
    ByGT: byGT,
    Search: search,
    partialInclude
  }
})()

findArrayByOperator.namespace('findArrayByOperator.Search')
findArrayByOperator.namespace('findArrayByOperator.ByST')
findArrayByOperator.namespace('findArrayByOperator.ByEQ')
findArrayByOperator.namespace('findArrayByOperator.ByGT')
findArrayByOperator.namespace('findArrayByOperator.partialInclude')

module.exports = findArrayByOperator
