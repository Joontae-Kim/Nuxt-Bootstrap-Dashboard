<template>
  <b-navbar type="dark" variant="white" class="bg-transparent">
    <b-navbar-nav align="center">
      <b-nav-text>
        <div class="cursor-pointer" @click="toggleSidebar">
          <b-icon-list color="#212529" font-scale="1.5" aria-hidden="true" variant="light" />
        </div>
      </b-nav-text>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'DashboardNav',
  methods: {
    toggleSidebar () {
      this.$emit('toggleSidebar')
    }
  }
}
</script>

<style>

</style>
