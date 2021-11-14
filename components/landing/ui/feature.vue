<template>
  <b-card no-body class="align-items-start p-3 h-100 shadow-sm border-light">
    <slot />
    <div class="d-flex flex-column">
      <h5 class="mb-1 text-dark">{{ title }}</h5>
      <em class="text-secondary">{{ description }}</em>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'Landingfeature',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
