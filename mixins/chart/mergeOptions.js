export default {
  name: 'mergeOptions',
  methods: {
    mergeOptions (target, source) {
      const isObject = obj => obj && typeof obj === 'object'

      if (!isObject(target) || !isObject(source)) {
        return source
      }

      Object.keys(source).forEach((key) => {
        const targetValue = target[key]
        const sourceValue = source[key]

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
          target[key] = targetValue.concat(sourceValue)
        } else if (Array.isArray(targetValue) && isObject(sourceValue)) {
          target[key] = targetValue.concat(sourceValue)
        } else if (isObject(targetValue) && isObject(sourceValue)) {
          target[key] = this.mergeOptions(Object.assign({}, targetValue), sourceValue)
        } else {
          target[key] = sourceValue
        }
      })

      return target
    }
  }
}
