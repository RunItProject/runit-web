<template>
  <form @submit.prevent="login">
    <h3 class="subtitle">Login</h3>
    <div class="field">
      <div class="control">
        <input class="input" type="email" placeholder="Your Email" autofocus="" v-model="email" name="email" required>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input" type="password" placeholder="Your Password" v-model="password" name="password" required>
      </div>
    </div>
    <button class="button is-block is-primary is-fullwidth" type="submit">Login</button>
    <p class="has-text-danger">{{error}}</p>
  </form>
</template>

<style>

</style>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import * as moment from "moment";
import IActivity from "../models/IActivity";
import Activity from "./Activity.vue";
import LoginLayout from "./LoginLayout.vue";

interface IData {
  email: string;
  password: string;
  error: string;
}

export default Vue.extend({
  components: { LoginLayout },
  props: [],
  data: (): IData => {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login() {
      this.$store.dispatch("AUTH_REQUEST", { identifier: this.email, identifierType: "email", password: this.password })
      .then(() => {
        this.$router.push('/');
      })
      .catch(() => {
        this.error = "Email or password incorrect.";
      });
    }
  }
});
</script>