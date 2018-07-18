<template>
<section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-dark">RunIt</h3>
          <div class="box">
            <router-view></router-view>
          </div>
          <p class="has-text-grey">
            <router-link to="/login">Login</router-link>
            &nbsp;·&nbsp;
            <router-link to="/register">Register</router-link>
            &nbsp;·&nbsp;
            <router-link to="/reset-password">Forgot password</router-link>
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
import { mapActions } from "vuex";
import * as moment from "moment";
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
    login() {
      this.$store.dispatch("AUTH_REQUEST", { email: this.email, password: this.password }).then(() => {
        this.$router.push('/');
      });
    }
  }
});
</script>