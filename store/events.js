export const state = () => ({
  list: []
})

export const getters = {
  getEvents: (state) => {
    return state.list
  }
}

export const mutations = {
  add (state, newList) {
    if (Array.isArray(newList)) {
      state.list = state.list.concat(newList)
    } else {
      state.list = newList
    }
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    console.log(`nuxtServerInit ~ `)
    // console.log(`               ~ `)
    const eventsRes = await app.$axios.$get('/api/event')
    console.log(`               ~ eventsRes => `, eventsRes)
    commit('add', eventsRes)
  }
}
