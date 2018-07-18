
<template>
  <form @submit.prevent="resetPassword">
    <h3 class="subtitle">Reset password</h3>
    <div class="field">
      <div class="control">
        <input class="input" type="email" placeholder="Your Email" autofocus="" v-model="email" name="email" required :disabled="isSubmitDisabled">
      </div>
    </div>
    <button class="button is-block is-info is-fullwidth" type="submit" :disabled="isSubmitDisabled">Submit</button>
    <p :class="{ 'has-text-danger': status == 'error', 'has-text-success': status == 'sent'}">{{message}}</p>
  </form>
</template>

<style>

</style>

<script lang="ts">
import axios, { AxiosResponse, AxiosError } from 'axios';
import Vue from "vue";
import LoginLayout from "./LoginLayout.vue";
import { setTimeout } from 'timers';

interface IData {
  email: string;
  message: null | string;
  status: null | "sending" | "sent" | "error";
}

export default Vue.extend({
  components: { LoginLayout },
  props: [],
  data: (): IData => {
    return {
      email: "",
      message: null,
      status: null
    };
  },
  methods: {
    resetPassword() {
      this.status = "sending";
      axios({ url: 'user/reset_password', data: {email: this.email}, method: 'POST' })
        .then(resp => {
          this.status = "sent";
          this.message = "A link to reset your password has been sent to your email.";
        })
        .catch((err: AxiosError) => {
          this.status = "error";
          if (err.response && err.response.status == 400) {
            this.message = "Invalid or unknown email.";
          } else {
            this.message = "An unknown error occured.";
          }
        });
    }
  },
  computed: {
    isSubmitDisabled() {
      return this.status == 'sending' || this.status == 'sent';
    }
  }
});
</script>