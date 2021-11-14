<template>
  <b-row v-show="!!title" class="mb-4">
    <b-col cols>
      <div class="header">
        <h1 class="header-title text-white">
          {{ title }}
        </h1>
        <slot name="description">
          <p v-if="description" class="header-subtitle text-white">
            {{ description }}
          </p>
        </slot>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "DashboardHeader",
  props: {
    title: {
      type: [String, Boolean],
      required: false,
      default: (titleProps) => {
        return typeof titleProps === 'undefined' ? false : titleProps
      }
    },
    description: {
      type: [String, Boolean],
      required: false,
      default: (descrProps) => {
        return typeof descrProps === 'undefined' ? false : descrProps
      }
    }
  }
}
</script>
