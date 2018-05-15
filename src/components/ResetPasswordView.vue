
<template>
  <form @submit.prevent="login">
    <h3 class="subtitle">Reset password</h3>
    <div class="field">
      <div class="control">
        <input class="input" type="email" placeholder="Your Email" autofocus="" v-model="email" required>
      </div>
    </div>
    <button class="button is-block is-info is-fullwidth" type="submit">Submit</button>
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
  email: string;
  password: string;
  remember: boolean;
}

export default Vue.extend({
  components: { LoginLayout },
  props: [],
  data: (): IData => {
    return {
      email: "",
      password: "",
      remember: false
    };
  },
  methods: {
    login() {
      this.$store.dispatch("AUTH_REQUEST", { email: this.email, password: this.password }).then(() => {
        this.$router.push('/');
      });
    }
  }
});
</script>