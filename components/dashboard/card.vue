<template>
  <b-card no-body :class="['dsCard', { 'overflow-hidden': !noOverflow }, cardPadding]" border-variant="light">
    <template v-if="(icon || useicon) && !custom">
      <b-row no-gutters>
        <b-col class="flex-grow-1">
          <p class="dsCard__title">{{ title }}</p>
          <b-row no-gutters>
            <b-col cols>
              <div class="dsCard__index">{{ index }}</div>
              <div v-show="rate" class="text-success dsCard__subIndex mb-1">
                <slot name="rate">+ {{ rate }}%</slot>
              </div>
              <div class="dsCard__guide">{{ guide }}</div>
            </b-col>
          </b-row>
        </b-col>
        <b-col col class="flex-grow-0">
          <template v-if="icon">
            <b-icon
              :icon="icon"
              class="dsCard__icon"
              font-scale="1.5"
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
      <b-row v-if="useTitle && title" :class="headClass" no-gutters align-v="center">
        <p :class="['dsCard__title', { 'mb-0': table }]">{{ title }}</p>
        <div class="ml-auto">
          <slot name="header-right" />
        </div>
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
      required: false,
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
    },
    index: {
      type: [String, Number],
      required: false,
      default: (indexProps) => {
        return (typeof indexProps === 'undefined') ? 'index' : indexProps
      }
    },
    rate: {
      type: [String, Number, Boolean],
      required: false,
      default: (rateProps) => {
        return (typeof rateProps === 'undefined') ? null : rateProps
      }
    },
    guide: {
      type: String,
      required: false,
      default: (guideProps) => {
        return (typeof guideProps === 'undefined') ? 'Since last month' : guideProps
      }
    },
    useTitle: {
      type: Boolean,
      required: false,
      default: (useTitleProps) => {
        return (typeof useTitleProps === 'undefined') ? true : useTitleProps
      }
    },
    noOverflow: {
      type: Boolean,
      required: false,
      default: (noOverflowProps) => {
        return (typeof noOverflowProps === 'undefined') ? false : noOverflowProps
      }
    },
    noPadding: {
      type: Boolean,
      required: false,
      default: (noPaddingProps) => {
        return (typeof noPaddingProps === 'undefined') ? false : noPaddingProps
      }
    },
    table: {
      type: Boolean,
      required: false,
      default: (tableProps) => {
        return (typeof tableProps === 'undefined') ? false : tableProps
      }
    },
    custom: {
      type: Boolean,
      required: false,
      default: (customProps) => {
        return (typeof customProps === 'undefined') ? false : customProps
      }
    }
  },
  computed: {
    headClass () {
      return this.table
        ? 'p-3'
        : false
    },
    cardPadding () {
      return this.noPadding || this.table
        ? 'p-0'
        : this.icon || this.useicon
          ? 'p-3'
          : 'pt-3 px-3'
    }
  }
}
</script>

<style>

</style>
