<template>
  <b-row class="h-100" cols="1" align-h="center" align-v="center" no-gutters>
    <b-col
      cols
      sm="10"
      md="8"
      lg="6"
      xl="5"
      xxl="4"
      class="shadow-lg my-3"
    >
      <div class="p-4 text-white rounded-top">
        <h1 class="mb-4">Reset password</h1>
        <p class="text-light font-weight-normal fs-6 mb-0 font-italic">
          Enter your email to reset your password.
        </p>
      </div>
      <b-overlay :show="showCompleteResetPwd" :opacity="0.75" blur="1px" class="w-100">
        <template #overlay>
          <div class="text-center text-success">
            <b-icon icon="check-circle" font-scale="2.5" class="mb-3" />
            <p class="font-weight-bold font-italic mb-0 fs-5">Success to Sign in!</p>
          </div>
        </template>
        <b-form class="p-4 bg-transparent-90 rounded-bottom shadow-lg" @submit.prevent="onSubmitResetPwd">
          <b-form-group
            id="input-group-email"
            type="email"
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
              placeholder="Enter email"
              :state="state.email"
              :aria-invalid="state.email"
              :disabled="resetPwdGlobalDisabledState"
              size="lg"
              required
            />
          </b-form-group>

          <button-overlay
            class="w-100"
            :show="progressOnResetPwd"
            button-ref="resetPwdBtn"
            spinner-variant="primary"
          >
            <b-button
              ref="resetPwdBtn"
              type="submit"
              variant="primary"
              size="lg"
              block
              class="mb-4"
            >
              Reset Password
            </b-button>
          </button-overlay>

          <b-form-row class="">
            <b-col cols class="d-flex justify-content-around">
              <nuxt-link :to="{ name: 'signin' }">Go to Sign in</nuxt-link>
              <nuxt-link :to="{ name: 'signup' }">Go to Sign up</nuxt-link>
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
  components: { buttonOverlay },
  provide () {
    return {
      parentRef: this.$refs
    }
  },
  layout: 'authentication',
  data: () => ({
    form: {
      email: ''
    },
    state: {
      email: null
    },
    invalid: {
      email: ''
    },
    progressOnResetPwd: false,
    showCompleteResetPwd: false
  }),
  computed: {
    resetPwdGlobalDisabledState () {
      return this.progressOnResetPwd
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
    progressOnResetPwd: {
      handler (now) {
        if (!now) {
          this.showCompleteResetPwd = true
          setTimeout(() => {
            this.showCompleteResetPwd = false
          }, 2500)
        }
      }
    }
  },
  methods: {
    checkFormValidation () {
      const validationChecker = { state: true, form: [] }
      const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,5}|[0-9]{2,4})(\]?)$/

      const validationEmail = emailRegex.test(this.form.email)

      // Test E-mail validation
      if (!validationEmail) {
        validationChecker.form.push({ name: 'email', message: 'Please check the your email format.' })
      }

      // Update Validation state
      if (validationChecker.form.length) {
        validationChecker.state = false
      }

      return validationChecker
    },
    onSubmitResetPwd () {
      // Initialise Reset Form state and invalid message
      this.initializeState()
      this.initializeInvalidMsg()

      // Validate Reset-pwd Form
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
        this.progressOnResetPwd = true
        setTimeout(() => {
          this.progressOnResetPwd = false
        }, 2500)
      }
    },
    initializeState () {
      this.state = { email: null }
    },
    initializeInvalidMsg () {
      this.invalid = { email: '' }
    }
  }
}
</script>

<style>

</style>
