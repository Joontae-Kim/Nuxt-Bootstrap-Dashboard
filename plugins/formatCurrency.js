import Vue from 'vue'

const mixin = {
  methods: {
    formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}

Vue.mixin(mixin)