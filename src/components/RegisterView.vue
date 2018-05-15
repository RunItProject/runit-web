<template>
  <form @submit.prevent="register">
    <h3 class="subtitle">Register</h3>
    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Your Display Name" autofocus="" v-model="name" required>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input" type="email" placeholder="Your Email" autofocus="" v-model="email" required>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input" type="password" placeholder="Your Password" v-model="password" required>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input" type="password" placeholder="Repeat Your Password" v-model="passwordRepeat" required>
      </div>
    </div>
    <button class="button is-block is-info is-fullwidth" type="submit">Register</button>
  </form>
</template>

<style>

</style>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import * as moment from "moment";
import throttle from "lodash.throttle";
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
      });
    }
  }
});
</script>