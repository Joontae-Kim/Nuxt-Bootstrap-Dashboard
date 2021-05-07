<template>
  <b-navbar type="dark" variant="white" class="shadow-sm">
    <b-navbar-nav align="center">
      <b-nav-text>
        <div class="cursor-pointer" @click="toggleSidebar">
          <b-icon-list color="#212529" font-scale="1.5" aria-hidden="true" />
        </div>
      </b-nav-text>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    toggleSidebar () {
      this.$emit('toggleSidebar')
    }
  }
}
</script>

<style>

</style>
