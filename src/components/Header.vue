<template>
<nav class="navbar is-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item">Calendar</router-link>
      <router-link to="/plans" class="navbar-item">Plans</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          <span class="icon"><i class="fas fa-user"></i></span>&ensp;{{currentUser && currentUser.name}}
        </a>
        <div class="navbar-dropdown is-active">
          <a class="navbar-item">Profile</a>
          <a class="navbar-item" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<style>
</style>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import * as moment from "moment";
import IActivity from "../models/IActivity";
import Activity from "./Activity.vue";
import Gravatar from "./Gravatar.vue";

interface IData {}

export default Vue.extend({
  components: { Gravatar },
  props: [],
  data: (): IData => {
    return {};
  },
  created() {
    if (!this.currentUser) {
      this.$store.dispatch('USER_REQUEST');
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('AUTH_LOGOUT').then(() => {
        this.$router.push('/login');
      });
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser"
    })
  }
});
</script>