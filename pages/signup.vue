<template>
  <b-row class="h-100 z-index-1000 rounded" cols="1" align-h="center" align-v="center" no-gutters>
    <b-col
      cols
      md="8"
      lg="6"
      xl="4"
      xxl="4"
      class="z-index-1000 shadow border-light"
    >
      <div class="p-4 text-white rounded-top">
        <h1 class="mb-4">Create new Account!</h1>
        <p class="text-light font-weight-normal fs-6 mb-1 font-italic">
          Please sign up to use
        </p>
        <p class="text-light font-weight-bold font-italic fs-6 mb-0">
          Nuxt Admin Dashboard with Bootstrap !
        </p>
      </div>
      <b-form class="p-4 bg-transparent-90 rounded-bottom shadow-lg" @submit="onSubmit" @reset="onReset">
        <b-form-row>
          <b-col cols>
            <b-form-group
              id="input-group-name"
              label="Name"
              label-for="input-name"
              label-size="sm"
            >
              <b-form-input
                id="input-name"
                v-model="form.name"
                placeholder="Enter your name"
                size="lg"
                required
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols>
            <b-form-group
              id="input-group-email"
              label="Email address:"
              label-for="input-email"
              label-size="sm"
              description="We'll never share your email with anyone else."
              class="mb-4"
            >
              <b-form-input
                id="input-email"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                size="lg"
                required
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols>
            <b-form-group
              id="input-group-pwd"
              label="Password"
              label-for="input-pwd"
              label-size="sm"
            >
              <b-form-input
                id="input-pwd"
                v-model="form.pwsd"
                type="password"
                placeholder="Enter your password"
                size="lg"
                required
              />
            </b-form-group>
          </b-col>
          <b-col cols>
            <b-form-group
              id="input-group-confirmedpwd"
              label="Confirm Password"
              label-for="input-confirmedpwd"
              label-size="sm"
            >
              <b-form-input
                id="input-confirmedpwd"
                v-model="form.confirmedpwsd"
                type="password"
                placeholder="Enter your password confirmed"
                size="lg"
                required
              />
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-button type="submit" variant="primary" size="lg" class="py-3 mt-5 mb-3" block>Sign Up</b-button>

        <b-form-row>
          <b-col cols>
            <div class="text-center text-secondary">
              <NuxtLink :to="{ name: 'signin'}">Go to Sign In Page</NuxtLink>
            </div>
          </b-col>
        </b-form-row>
      </b-form>
    </b-col>
    <!-- <b-col cols>
      <div class="text-center text-secondary">
        <NuxtLink :to="{ name: 'signin'}">Go to Sign In Page</NuxtLink>
      </div>
    </b-col> -->
  </b-row>
</template>

<script>
export default {
  name: 'Signin',
  layout: 'authentication',
  data: () => ({
    form: {
      name: '',
      email: '',
      pwsd: '',
      confirmedpwsd: ''
    },
    state: {
      email: '',
      pwsd: ''
    },
    message: {
      email: '',
      pwsd: ''
    }
  }),
  computed: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log(`onSubmit`)
    },
    onReset () {
      console.log(`onSubmit`)
    }
  }
}
</script>

<style>
</style>
