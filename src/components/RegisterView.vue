<template>
  <form @submit.prevent="register">
    <h3 class="subtitle">Register</h3>
    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Your Display Name" autofocus="" v-model="name" name="name" required>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input" type="email" placeholder="Your Email" v-model="email" name="email" required>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input" type="password" placeholder="Your Password" v-model="password" name="password" required>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input" type="password" placeholder="Repeat Your Password" v-model="passwordRepeat" name="passwordRepeat" required>
      </div>
    </div>
    <button class="button is-block is-primary is-fullwidth" type="submit">Register</button>
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
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export default Vue.extend({
  components: { LoginLayout },
  props: [],
  data: (): IData => {
    return {
      name: "",
      email: "",
      password: "",
      passwordRepeat: ""
    };
  },
  methods: {
    register() {
      var data = {
        name: this.name, email: this.email, password: this.password, passwordRepeat: this.passwordRepeat
      };

      this.$store.dispatch("AUTH_REGISTER", data).then(() => {
        this.$router.push('/');
      })
      .catch(() => {
        this.error = "An error occured.";
      });;
    }
  }
});
</script>