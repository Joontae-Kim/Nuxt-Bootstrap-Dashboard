import { transformMultiEvent } from '../lib/event.lib'

export const state = () => ({
  list: []
})

export const getters = {
  getEvents: (state) => {
    return state.list
  },
  getTotalEventCount: (state) => {
    return state.list.length
  }
}

export const mutations = {
  set (state, newList) {
    state.list = newList
  },
  add (state, newList) {
    if (Array.isArray(newList)) {
      state.list = state.list.concat(newList)
    } else {
      state.list = !newList ? [] : newList
    }
  },
  update (state, updating) {
    const eventIdx = state.list.findIndex(event => event._id === updating.id)
    if (eventIdx !== -1) {
      state.list[eventIdx] = {
        ...state.list[eventIdx],
        ...updating.content
      }
    } else {
      state.list = state.list.splice(eventIdx, 1)
    }
  }
}

export const actions = {
  async DISPATCH_SET ({ commit }, events) {
    const transformed = await transformMultiEvent(events)
    commit('set', transformed)
  },
  async DISPATCH_ADD ({ commit }, events) {
    const transformed = await transformMultiEvent(events)
    commit('add', transformed)
  }
}
