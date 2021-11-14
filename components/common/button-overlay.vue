<template>
  <b-overlay
    :class="customClass"
    :show="show"
    rounded
    opacity="0.6"
    spinner-small
    :spinner-variant="spinnerVariant"
    class=""
    @hidden="onHidden"
  >
    <slot />
  </b-overlay>
</template>

<script>
export default {
  name: 'ButtonOverlay',
  inject: ['parentRef'],
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    buttonRef: {
      type: String,
      required: false,
      default: (buttonRefProps) => {
        return typeof buttonRefProps === 'undefined' ? null : buttonRefProps
      }
    },
    spinnerVariant: {
      type: String,
      required: false,
      default: 'primary'
    }
  },
  data: () => ({
    customClass: 'd-inline-block'
  }),
  computed: {},
  created () {
    this.customClass = this.$vnode.data.staticClass || 'd-inline-block'
  },
  mounted () {},
  beforeDestroy () {},
  methods: {
    onHidden () {
      if (this.buttonRef && Object.keys(this.parentRef).length) {
        if (this.parentRef[this.buttonRef]) {
          this.parentRef[this.buttonRef].focus()
        }
      }
    }
  }
}
</script>

<style>

</style>
