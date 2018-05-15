<template>
<div>
    <Header></Header>
    <router-view></router-view>>
</div>
</template>

<style>

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