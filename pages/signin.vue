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
      <b-overlay :show="showCompleteSignIn" :opacity="0.75" blur="1px" class="w-100">
        <template #overlay>
          <div class="text-center text-success">
            <b-icon icon="check-circle" font-scale="2.5" class="mb-3" />
            <p class="font-weight-bold font-italic mb-0 fs-5">Success to Sign in!</p>
          </div>
        </template>
        <b-form class="p-4 bg-transparent-90 rounded-bottom shadow-lg" @submit.prevent="onSubmit">
          <b-form-group
            id="input-group-email"
            type="email"
            label="Email address:"
            label-for="input-email"
            label-size="sm"
            description="We'll never share your email with anyone else."
            class="mb-4"
            :invalid-feedback="invalid.email"
          >
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              :state="state.email"
              :aria-invalid="state.email"
              :disabled="signinGlobalDisabledState"
              size="lg"
              required
            />
          </b-form-group>

          <b-form-group
            id="input-group-pwd"
            label="Password"
            label-for="input-pwd"
            label-size="sm"
            class="mb-5"
            :invalid-feedback="invalid.pwsd"
          >
            <b-form-input
              id="input-pwd"
              v-model="form.pwsd"
              type="password"
              placeholder="Enter password"
              :state="state.pwsd"
              :aria-invalid="state.pwsd"
              :disabled="signinGlobalDisabledState"
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

          <button-overlay
            class="w-100"
            :show="progressOnSignin"
            button-ref="LoginBtn"
            spinner-variant="primary"
          >
            <b-button
              ref="LoginBtn"
              type="submit"
              variant="primary"
              size="lg"
              class="py-3 mt-5 mb-3"
              block
            >
              Login
            </b-button>
          </button-overlay>

          <b-form-row>
            <b-col cols>
              <div class="text-center text-secondary">
                <NuxtLink :to="{ name: 'signup'}">Go to Sign Up Page</NuxtLink>
              </div>
            </b-col>
          </b-form-row>
        </b-form>
      </b-overlay>
    </b-col>
  </b-row>
</template>

<script>
import buttonOverlay from '~/components/common/button-overlay.vue'

export default {
  name: 'Signin',
  components: { buttonOverlay },
  provide () {
    return {
      parentRef: this.$refs
    }
  },
  layout: 'authentication',
  data: () => ({
    form: {
      email: '',
      pwsd: '',
      rememberme: false
    },
    state: {
      email: null,
      pwsd: null
    },
    invalid: {
      email: '',
      pwsd: ''
    },
    progressOnSignin: false,
    showCompleteSignIn: false
  }),
  computed: {
    signinGlobalDisabledState () {
      return this.progressOnSignin
    }
  },
  watch: {
    'form.email': {
      handler (prev, now) {
        if (prev !== now && this.state.email !== null) {
          this.invalid.email = ''
          this.state.email = null
        }
      }
    },
    'form.pwsd': {
      handler (prev, now) {
        if (prev !== now && this.state.pwsd !== null) {
          this.invalid.pwsd = ''
          this.state.pwsd = null
        }
      }
    },
    progressOnSignin: {
      handler (now) {
        if (!now) {
          this.showCompleteSignIn = true
          setTimeout(() => {
            this.showCompleteSignIn = false
          }, 1500)
          setTimeout(() => {
            this.$router.push({ name: 'overview' })
          }, 1500)
        }
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    checkFormValidation () {
      // validationChecker.form: [{ name: null, message: null }]
      const validationChecker = { state: true, form: [] }
      const regex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      const validationEmail = regex.test(this.form.email)

      // Test E-mail validation
      if (!validationEmail) {
        validationChecker.form.push({ name: 'email', message: 'Please check the your email format.' })
      }

      // Test Password validation
      console.log(`this.form.pwsd => ${this.form.pwsd} // this.form.pwsd.length => ${this.form.pwsd.length}, ${this.form.pwsd.length < 8}`)
      if (this.form.pwsd.length < 8) {
        validationChecker.form.push({ name: 'pwsd', message: 'Please write at least 8 characters.' })
      } else if (this.form.pwsd.search(/\s/) !== -1) {
        validationChecker.form.push({ name: 'pwsd', message: 'Please write at least 8 characters without spaces.' })
      } else {
        const numValidation = this.form.pwsd.search(/[0-9]/g)
        const engValidation = this.form.pwsd.search(/[a-z]/ig)
        const speValidation = this.form.pwsd.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
        if (numValidation < 0 || engValidation < 0 || speValidation < 0) {
          validationChecker.form.push({ name: 'pwsd', message: 'Please write at least 8 characters, including letters, numbers, and special characters.' })
        }
      }

      // Update Validation state
      if (validationChecker.form.length) {
        validationChecker.state = false
      }

      return validationChecker
    },
    onSubmit () {
      // Initialise Sign-in Form state and invalid message
      this.initializeState()
      this.initializeInvalidMsg()

      // Validate Sign-in Form
      const validation = this.checkFormValidation()
      if (!validation.state) {
        validation.form.forEach(({ name, message }) => {
          this.state[name] = false
          this.invalid[name] = message
        })
        return false
      } else {
        this.state.email = true
        this.state.pwsd = true
        this.progressOnSignin = true
        setTimeout(() => {
          this.progressOnSignin = false
        }, 2300)
        // this.showCompleteSignIn = true
        // setTimeout(() => {
        //   this.showCompleteSignIn = false
        // }, 2000)
      }
    },
    initializeState () {
      this.state = { email: null, pwsd: null }
    },
    initializeInvalidMsg () {
      this.invalid = { email: '', pwsd: '' }
    },
    initializeForm () {
      this.invalid = { email: '', pwsd: '', rememberme: false }
    }
  }
}
</script>

<style>
</style>
