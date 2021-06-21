import { transformMultiUsers } from "../lib/users.lib"

export const state = () => ({
  list: []
})

export const getters = {
  getUsers: (state) => {
    return state.list
  },
  getUserPaymentList: (state) => {
    if (!state.list.length) {
      return []
    } else {
      return state.list.reduce((payments, user) => {
        if (user.payment && !payments.includes(user.payment)) {
          payments.push(user.payment)
        }
        return payments
      }, [])
    }
  }
}

export const mutations = {
  set (state, newList) {
    state.list = newList
  }
}

export const actions = {
  async DISPATCH_SET ({ commit }, users) {
    const transformed = await transformMultiUsers(users)
    commit('set', transformed)
  }
}
