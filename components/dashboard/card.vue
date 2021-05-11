<template>
  <b-card no-body class="dsCard overflow-hidden shadow-sm p-3" border-variant="light">
    <template v-if="icon || useicon">
      <b-row no-gutters>
        <b-col cols="auto" class="flex-grow-1">
          <p class="dsCard__title">{{ title }}</p>
          <slot />
        </b-col>
        <b-col cols="auto" class="flex-grow-0">
          <template v-if="icon">
            <b-icon
              :icon="icon"
              class="dsCard__icon rounded p-2"
              font-scale="2.3"
              aria-hidden="true"
            />
          </template>
          <template v-else>
            <slot name="icon" />
          </template>
        </b-col>
      </b-row>
      <slot name="footer" />
    </template>
    <template v-else>
      <b-row no-gutters>
        <p class="dsCard__title">{{ title }}</p>
      </b-row>
      <slot />
      <slot name="footer" />
    </template>
  </b-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
      default: 'title'
    },
    useicon: {
      type: Boolean,
      required: false,
      default: (useiconProps) => {
        return (typeof useiconProps === 'undefined') ? false : useiconProps
      }
    },
    icon: {
      type: [Boolean, String],
      required: false,
      default: (iconProps) => {
        return (typeof iconProps === 'undefined') ? false : iconProps
      }
    }
  }
}
</script>

<style>

</style>
