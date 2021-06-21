<template>
  <b-row no-gutters class="px-3 mb-4">
    <b-col cols>
      <b-form
        :aria-disabled="disabled"
        class="p-3 border bg-light rounded"
        @submit.prevent="onSubmit"
        @reset="onReset"
      >
        <b-form-row>
          <b-col cols="12" md="4">
            <b-form-group
              id="filter-group-id"
              label="Id"
              label-for="filter-id"
            >
              <b-form-input
                id="filter-id"
                v-model="form.id"
                placeholder="Enter User ID"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group
              id="filter-group-uid"
              label="UID"
              label-for="filter-uid"
            >
              <b-form-input
                id="filter-uid"
                v-model="form.uid"
                placeholder="Enter User UUID"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
          <b-col cols md="4">
            <b-form-group
              id="filter-group-username"
              label="Name"
              label-for="filter-username"
            >
              <b-form-input
                id="filter-username"
                v-model="form.username"
                placeholder="Enter User Name"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols md="4">
            <b-form-group
              id="filter-group-email"
              label="E-mail"
              label-for="filter-email"
            >
              <b-form-input
                id="filter-email"
                v-model="form.email"
                placeholder="Enter User E-mail"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
          <b-col cols md="4">
            <b-form-group
              id="filter-group-phoneNumber"
              label="Phone Number"
              label-for="filter-phoneNumber"
            >
              <b-form-input
                id="filter-phoneNumber"
                v-model="form.phoneNumber"
                placeholder="Enter User Phone Number"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
          <b-col cols md="4">
            <b-form-group
              id="filter-group-address"
              label="Address"
              label-for="filter-address"
            >
              <b-form-input
                id="filter-address"
                v-model="form.address"
                placeholder="Enter User Address"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols md="4">
            <b-form-group
              id="filter-group-creditCard"
              label="Credit Card Number"
              label-for="filter-creditCard"
            >
              <b-form-input
                id="filter-creditCard"
                v-model="form.creditCard"
                placeholder="Enter User Credit Card Number"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
          <b-col cols md="8">
            <b-form-group
              id="filter-group-payment"
              v-slot="{ ariaDescribedby }"
              label="Payment"
              label-for="filter-payment"
            >
              <b-form-checkbox-group
                id="filter-payment"
                v-model="form.payment"
                :options="paymentOpt"
                :aria-describedby="ariaDescribedby"
                name="filter-payment-chckbx"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols md="6">
            <b-form-group
              id="filter-group-authentication"
              v-slot="{ ariaDescribedby }"
              label="Authentication Type"
              label-for="filter-authentication"
            >
              <b-form-checkbox-group
                id="filter-authentication"
                v-model="form.authentication"
                :options="authenticationOpt"
                :aria-describedby="ariaDescribedby"
                name="filter-authentication-chckbx"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
          <b-col cols md="6">
            <b-form-group
              id="filter-group-status"
              v-slot="{ ariaDescribedby }"
              label="Status"
              label-for="filter-status"
            >
              <b-form-checkbox-group
                id="filter-status"
                v-model="form.status"
                :options="statusOpt"
                :aria-describedby="ariaDescribedby"
                name="filter-status-chckbx"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols class="text-right">
            <button-overlay button-ref="'submitRef'" :show="isSearching">
              <b-btn ref="submitRef" type="submit" variant="primary" :disabled="disabled || localDisabled || !isEdited" class="mr-2">
                Submit
              </b-btn>
            </button-overlay>
            <button-overlay button-ref="resetRef" spinner-variant="danger" :show="isResetting">
              <b-btn ref="resetRef" type="reset" variant="danger" :disabled="disabled || localDisabled || !isEdited">
                Reset
              </b-btn>
            </button-overlay>
          </b-col>
        </b-form-row>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import searchUser from '~/mixins/user/searchUser'

const filterForm = {
  id: null,
  uid: null,
  username: null,
  email: null,
  phoneNumber: null,
  address: null,
  creditCard: null,
  status: [],
  authentication: [],
  payment: []
}

export default {
  name: "UsersFilter",
  mixins: [
    searchUser
  ],
  provide () {
    return {
      parentRef: this.$refs
    }
  },
  props: {
    disabled: {
      type: Boolean,
      required: true,
      default: (disabledProps) => {
        return typeof disabledProps === 'undefined' ? false : disabledProps
      }
    }
  },
  data: () => ({
    isSearching: false,
    isResetting: false,
    form: Object.assign({}, filterForm),
    statusOpt: [
      { text: 'Active', value: 'Active' },
      { text: 'Inactive', value: 'Inactive' },
      { text: 'Pending Approval', value: 'Pending Approval' },
      { text: 'Not Yet Activated', value: 'Not Yet Activated' }
    ],
    authenticationOpt: [
      { text: 'E-mail', value: 'E-mail' },
      { text: 'Google', value: 'Google' },
      { text: 'Github', value: 'Github' },
      { text: 'Facebook', value: 'Facebook' }
    ]
  }),
  computed: {
    paymentOpt () {
      const userPayments = this.$store.getters['users/getUserPaymentList']
      const userPaymentsOpt = userPayments.map(payment => ({ text: payment, value: payment }))
      userPaymentsOpt.unshift({ text: '(not written)', value: null })
      return userPaymentsOpt
    },
    localDisabled () {
      return this.isSearching || this.isResetting
    },
    isEdited () {
      return (this.form.id !== null && this.form.id !== '') ||
        (this.form.uid !== null && this.form.uid !== '') ||
        (this.form.username !== null && this.form.username !== '') ||
        (this.form.email !== null && this.form.email !== '') ||
        (this.form.phoneNumber !== null && this.form.phoneNumber !== '') ||
        (this.form.address !== null && this.form.address !== '') ||
        (this.form.creditCard !== null && this.form.creditCard !== '') ||
        !!this.form.status.length ||
        !!this.form.authentication.length ||
        !!this.form.payment.length
    }
  },
  watch: {
    isSearching (val) {
      this.$emit('setSearchingState', val)
    },
    isResetting (val) {
      this.$emit('setResetFormState', val)
    }
  },
  methods: {
    async onSubmit () {
      try {
        if (!this.isEdited) {
          return false
        }
        this.isSearching = true
        const searchRes = await this.searchUser(this.form)
        await this.$store.dispatch('users/DISPATCH_SET', searchRes.list)
      } catch (err) {
        console.log(err)
      } finally {
        this.isSearching = false
      }
    },
    async onReset () {
      try {
        if (!this.isEdited) {
          return false
        }
        this.isResetting = true
        this.form = Object.assign({}, filterForm)
        const res = await this.$axios.$get('/api/users')
        await this.$store.dispatch('users/DISPATCH_SET', res.list)
      } catch (err) {
        console.log(err)
      } finally {
        this.isResetting = false
      }
    }
  }
}
</script>

<style>

</style>
