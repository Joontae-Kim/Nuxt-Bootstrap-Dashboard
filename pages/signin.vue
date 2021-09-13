<template>
  <b-row class="h-100 z-index-1000 rounded overflow-auto" cols="1" align-h="center" align-v="center" no-gutters>
    <b-col
      cols
      md="8"
      lg="6"
      xl="4"
      xxl="4"
      class="z-index-1000 shadow border-light"
    >
      <div class="p-4 text-white rounded-top">
        <h1 class="mb-4">Login</h1>
        <p class="text-light font-weight-normal fs-6 mb-1 font-italic">
          Welcome! Please confirm that you are visiting to
        </p>
        <p class="text-light font-weight-bold font-italic fs-6 mb-0">
          Nuxt Admin Dashboard with Bootstrap !
        </p>
      </div>
      <b-form class="p-4 bg-transparent-90 rounded-bottom shadow-lg" @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          label-size="sm"
          description="We'll never share your email with anyone else."
          class="mb-4"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            size="lg"
            required
          />
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Password"
          label-for="input-2"
          label-size="sm"
          class="mb-5"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            type="password"
            placeholder="Enter name"
            size="lg"
            required
          />
        </b-form-group>

        <b-form-row class="">
          <b-col cols="6">
            <b-form-checkbox v-model="form.rememberme" name="check-button" switch>
              Remember Me
            </b-form-checkbox>
          </b-col>
          <b-col cols="6">
            <div class="text-right text-secondary">
              Forget Password?
            </div>
          </b-col>
        </b-form-row>

        <b-button type="submit" variant="primary" size="lg" class="py-3 mt-5 mb-3" block>Login</b-button>

        <b-form-row>
          <b-col cols>
            <div class="text-center text-secondary">
              <NuxtLink :to="{ name: 'signup'}">Go to Sign Up Page</NuxtLink>
            </div>
          </b-col>
        </b-form-row>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Signin',
  layout: 'authentication',
  data: () => ({
    form: {
      email: '',
      pwsd: '',
      rememberme: false
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
