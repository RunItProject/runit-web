<template>
<section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-dark">RunIt</h3>
          <p class="subtitle has-text-dark">Please login to proceed.</p>
          <div class="box">
            <form @submit.prevent="doLogin">
              <div class="field">
                <div class="control">
                  <input class="input" type="email" placeholder="Your Email" autofocus="" v-model="email">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Your Password" v-model="password">
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox" v-model="remember">
                  Remember me
                </label>
              </div>
              <button class="button is-block is-info is-fullwidth" type="submit">Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="../">Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Forgot Password</a> &nbsp;·&nbsp;
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>

</style>

<script lang="ts">
import Vue from "vue";
import * as moment from "moment";
import throttle  from "lodash.throttle";
import IActivity from "../models/IActivity";
import Activity from "./Activity.vue";

interface IData {
  email: string;
  password: string;
  remember: boolean;
}

export default Vue.extend({
  components: {},
  props: [],
  data: (): IData => {
    return {
      email: "",
      password: "",
      remember: false
    };
  },
  methods: {
    doLogin() {
      console.log("Login " + this.email + " with " + this.password);
    }
  }
});
</script>