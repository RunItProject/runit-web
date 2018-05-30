<template>
<div>
    <Header></Header>
    <main class="container is-fluid">
      <router-view></router-view>
    </main>
</div>
</template>

<style>
.container {
  margin-top: 32px; 
}
</style>

<script lang="ts">
import Vue from "vue";
import * as moment from "moment";
import throttle  from "lodash.throttle";
import Header from './Header.vue';

interface IData {
}

export default Vue.extend({
  components: {
      Header
  },
  props: [],
  data: (): IData => {
    return {};
  },
  methods: {
  }
});
</script>