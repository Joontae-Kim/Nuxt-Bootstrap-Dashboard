<template>
  <b-row class="h-100" cols="1" align-h="center" align-v="center" no-gutters>
    <b-col
      cols
      md="8"
      lg="6"
      xl="4"
      xxl="4"
      class="shadow-lg my-3"
    >
      <div class="px-4 py-3 rounded-top text-white">
        <h1 class="mb-4">Create new Account!</h1>
        <p class="font-weight-normal fs-6 mb-1 font-italic text-white-30">
          Please sign up to use
        </p>
        <p class="font-weight-bold font-italic fs-6 mb-0 text-white-30">
          Nuxt Admin Dashboard with Bootstrap !
        </p>
      </div>
      <b-overlay :show="showCompleteSignUp" :opacity="0.75" blur="1px" class="w-100">
        <template #overlay>
          <div class="text-center text-success">
            <b-icon icon="check-circle" font-scale="2.5" class="mb-3" />
            <p class="font-weight-bold font-italic mb-0 fs-5">Success to Sign up!</p>
          </div>
        </template>
        <b-form class="p-4 bg-transparent-90 rounded-bottom shadow-lg" @submit.prevent="onSubmit">
          <b-form-row>
            <b-col cols>
              <b-form-group
                id="input-group-name"
                label="Name"
                label-for="input-name"
                label-size="sm"
                :invalid-feedback="invalid.name"
              >
                <b-form-input
                  id="input-name"
                  v-model="form.name"
                  placeholder="Enter your name"
                  :state="state.name"
                  :aria-invalid="state.name"
                  :disabled="signupGlobalDisabledState"
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
                :description="state.email !== null ? '' : 'We\'ll never share your email with anyone else.'"
                class="mb-4"
                :invalid-feedback="invalid.email"
              >
                <b-form-input
                  id="input-email"
                  v-model="form.email"
                  type="email"
                  :state="state.email"
                  :aria-invalid="state.email"
                  :disabled="signupGlobalDisabledState"
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
                :invalid-feedback="invalid.pwsd"
              >
                <b-form-input
                  id="input-pwd"
                  v-model="form.pwsd"
                  type="password"
                  placeholder="Enter your password"
                  :state="state.pwsd"
                  :aria-invalid="state.pwsd"
                  :disabled="signupGlobalDisabledState"
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
                :invalid-feedback="invalid.confirmedpwsd"
              >
                <b-form-input
                  id="input-confirmedpwd"
                  v-model="form.confirmedpwsd"
                  type="password"
                  placeholder="Enter your password confirmed"
                  :state="state.confirmedpwsd"
                  :aria-invalid="state.confirmedpwsd"
                  :disabled="signupGlobalDisabledState"
                  size="lg"
                  required
                />
              </b-form-group>
            </b-col>
          </b-form-row>

          <button-overlay
            class="w-100"
            :show="progressOnSignUp"
            button-ref="SingUpBtn"
            spinner-variant="primary"
          >
            <b-button
              ref="SingUpBtn"
              type="submit"
              variant="primary"
              size="lg"
              class="py-3 mt-5 mb-3"
              block
            >
              Sign Up
            </b-button>
          </button-overlay>

          <b-form-row>
            <b-col cols>
              <div class="text-center text-secondary">
                <NuxtLink :to="{ name: 'signin'}">Go to Sign In Page</NuxtLink>
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
      name: '',
      email: '',
      pwsd: '',
      confirmedpwsd: ''
    },
    state: {
      name: null,
      email: null,
      pwsd: null,
      confirmedpwsd: null
    },
    invalid: {
      name: '',
      email: '',
      pwsd: '',
      confirmedpwsd: ''
    },
    progressOnSignUp: false,
    showCompleteSignUp: false
  }),
  computed: {
    signupGlobalDisabledState () {
      return this.progressOnSignUp
    }
  },
  watch: {
    'form.name': {
      handler (prev, now) {
        if (prev !== now && this.state.name !== null) {
          this.invalid.name = ''
          this.state.name = null
        }
      }
    },
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
    'form.confirmedpwsd': {
      handler (prev, now) {
        if (prev !== now && this.state.confirmedpwsd !== null) {
          this.invalid.confirmedpwsd = ''
          this.state.confirmedpwsd = null
        }
      }
    },
    progressOnSignUp: {
      handler (now) {
        if (!now) {
          this.showCompleteSignUp = true
          setTimeout(() => {
            this.showCompleteSignUp = false
          }, 1500)
          setTimeout(() => {
            this.$router.push({ name: 'signin' })
          }, 1500)
        }
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    checkFormValidation () {
      const validationChecker = { state: true, form: [] }
      const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,5}|[0-9]{2,4})(\]?)$/
      const nameRegex = /^[A-Za-z0-9]+$/
      const validationEmail = emailRegex.test(this.form.email)
      const validationName = nameRegex.test(this.form.name)

      // Test Name validation
      if (!validationName) {
        validationChecker.form.push({ name: 'name', message: 'Please write your name including only letters and numbers.' })
      } else if (this.form.name.length < 3) {
        validationChecker.form.push({ name: 'name', message: 'Please write at least 3 characters.' })
      }

      // Test E-mail validation
      if (!validationEmail) {
        validationChecker.form.push({ name: 'email', message: 'Please check the your email format.' })
      }

      // Test Password validation
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

      if (this.form.confirmedpwsd.length < 8) {
        validationChecker.form.push({ name: 'confirmedpwsd', message: 'Please write at least 8 characters.' })
      } else if (this.form.confirmedpwsd.search(/\s/) !== -1) {
        validationChecker.form.push({ name: 'confirmedpwsd', message: 'Please write at least 8 characters without spaces.' })
      } else {
        const numValidation = this.form.confirmedpwsd.search(/[0-9]/g)
        const engValidation = this.form.confirmedpwsd.search(/[a-z]/ig)
        const speValidation = this.form.confirmedpwsd.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
        if (numValidation < 0 || engValidation < 0 || speValidation < 0) {
          validationChecker.form.push({ name: 'confirmedpwsd', message: 'Please write at least 8 characters, including letters, numbers, and special characters.' })
        }
      }
      const [hasPwsdMsg, hasConfirmedpwsdMsg] = [
        validationChecker.form.findIndex(({ name }) => name === 'pwsd'),
        validationChecker.form.findIndex(({ name }) => name === 'confirmedpwsd')
      ]
      if ((hasPwsdMsg === -1 && hasConfirmedpwsdMsg === -1) && this.form.confirmedpwsd !== this.form.pwsd) {
        validationChecker.form.push(
          { name: 'pwsd', message: 'Please check the password and confirm password.' },
          { name: 'confirmedpwsd', message: 'Please check the password and confirm password.' }
        )
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

      // Validate Sign-Up Form
      const validation = this.checkFormValidation()
      if (!validation.state) {
        validation.form.forEach(({ name, message }) => {
          this.state[name] = false
          this.invalid[name] = message
        })
        return false
      } else {
        this.state = { name: true, email: true, pwsd: true, confirmedpwsd: true }
        this.progressOnSignUp = true
        setTimeout(() => {
          this.progressOnSignUp = false
        }, 2300)
      }
    },
    initializeState () {
      this.state = { name: null, email: null, pwsd: null, confirmedpwsd: null }
    },
    initializeInvalidMsg () {
      this.invalid = { name: '', email: '', pwsd: '', confirmedpwsd: '' }
    }
  }
}
</script>

<style>
</style>
