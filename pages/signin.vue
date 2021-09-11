<template>
  <b-container fluid class="vh-100 p-3">
    <b-row class="h-100 rounded shadow-lg" no-gutters>
      <b-col cols md="6" class="d-none d-md-block h-100 rounded-left wrapper--sign">
        <div class="position-absolute w-100 h-100">
          <div class="position-relative w-100 h-100">
            <template v-for="index in 6">
              <span :key="index" :class="`circle circle-layer-${index}`" />
            </template>
          </div>
          <div class="sign__welcolme z-index-1000 px-5">
            <h1 class="text-white mb-3">Welcome to </h1>
            <span class="text-light font-weight-normal fs-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, deserunt.</span>
          </div>
        </div>
      </b-col>
      <b-col cols md="6" class="d-flex flex-column h-100 overflow-auto bg-white">
        <b-row align-content="center" cols="1" class="my-auto" no-gutters>
          <b-col cols="12" class="p-4 py-md-4 px-md-5">
            <h1 class="mb-4">Login</h1>
            <p class="text-secondary font-weight-normal fs-6 mb-1">
              Welcome! Please confirm that you are visiting
            </p>
            <p class="text-secondary font-weight-normal fs-6 mb-0">
              Nuxt Admin Project with Bootstrap!
            </p>
            <b-form class="mt-5" @submit="onSubmit" @reset="onReset">
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

              <b-form-row class="mb-5">
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

              <b-button type="submit" variant="primary" size="lg" block class="py-3">Login</b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Signin',
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

<style lang="scss" scoped>
@import '../assets/styles/page/signIn.scss';
</style>
