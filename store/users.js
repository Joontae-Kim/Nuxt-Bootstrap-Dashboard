export const state = () => ({
  list: []
})

export const getters = {
  getUsers: (state) => {
    return state.list
  },
  getUsersCount: (state) => {
    return state.list.length
  },
  getActiveUsersCount: (state) => {
    return state.list.filter(user => user.status === 'Active').length
  },
  groupByStatus: (state) => {
    if (state.list.length) {
      return state.list.reduce((grouping, user) => {
        const group = user.status.replace(/ /g, "_")
        if (!grouping[group]) { grouping[group] = 0 }
        grouping[group] += 1
        return grouping
      }, {})
    } else {
      return {}
    }
  }
}

export const mutations = {
  set (state, newList) {
    state.list = newList
  }
}

export const actions = {
  DISPATCH_SET ({ commit }, users) {
    // const transformed = await transformMultiEvent(events)
    commit('set', users)
  }
}
