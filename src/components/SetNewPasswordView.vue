
<template>
  <form @submit.prevent="updatePassword">
    <h3 class="subtitle">Set new password</h3>
    <div class="field">
      <div class="control">
        <input class="input" type="password" placeholder="New password" autofocus="" v-model="password" name="password" required>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input" type="password" placeholder="Repeat password" autofocus="" v-model="passwordRepeat" name="passwordRepeat" required>
      </div>
    </div>
    <button class="button is-block is-primary is-fullwidth" type="submit">Submit</button>
    <p :class="{ 'has-text-danger': status == 'error', 'has-text-success': status == 'success'}">{{message}}</p>
  </form>
</template>

<style>

</style>

<script lang="ts">
import axios,{ AxiosResponse, AxiosError } from 'axios';
import Vue from "vue";
import LoginLayout from "./LoginLayout.vue";
import { setTimeout } from 'timers';

interface IData {
  password: string;
  passwordRepeat: string;
  status: null | "updating" | "success" | "error";
  message: string;
}

export default Vue.extend({
  components: { LoginLayout },
  props: [],
  data: (): IData => {
    return {
      password: "",
      passwordRepeat: "",
      status: null,
      message: ""
    };
  },
  methods: {
    updatePassword() {
      if (this.password !== this.passwordRepeat) {
        this.status = "error";
        this.message = "Passwords do not match.";
        return;
      }

      let data = {
        userId: this.$route.params.userId,
        token: this.$route.query.token,
        password: this.password,
        passwordRepeat: this.passwordRepeat
      };

      this.status = "sending";
      axios({ url: 'user/reset_password', data, method: 'PUT' })
        .then(resp => {
          this.status = "success";
          this.$store.dispatch("AUTH_REQUEST", { identifier: data.userId, identifierType: "Id", password: this.password })
            .then(() => {
              this.$router.push('/');
            })
            .catch(() => {
              this.message = "An unknown error occured. Please try logging in with your new password.";
            });
        })
        .catch((err: AxiosError) => {
          debugger;
          this.status = "error";
          if (err.response && err.response.status == 400) {
            this.message = "Invalid password. Passwords must be at least 6 characters and must have at least one special character and one digit.";
          } else {
            this.message = "An unknown error occured.";
          }
        });
    }
  },
  computed: {
    isFormDisabled() {
      return this.status == "updating" || "success";
    }
  }
});
</script>