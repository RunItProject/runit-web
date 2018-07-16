<template>
    <img :src="imageUrl" />
</template>

<style>
</style>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import * as md5 from "md5";
import "lodash/throttle";
import IActivity from "../models/IActivity";
import Activity from "./Activity.vue";

export default Vue.extend({
  props: ["email"],
  computed: {
      imageUrl() {
          return "//www.gravatar.com/avatar/" + md5(this.email) + "?d=mm";
      }
  }
});
</script>