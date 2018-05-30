<template>
    <select v-bind:value="value" @input="$emit('input', $event.target.value)" @change="$emit('change', $event)">
        <option value="1">Easy</option>
        <option value="2">Long</option>
        <option value="3">Race</option>
    </select>
</template>

<style>

</style>

<script lang="ts">
import Vue from "vue";

interface IData {
}

export default Vue.extend({
  components: {
  },
  props: ['value'],
  data: (): IData => {
    return {};
  },
  methods: {
  }
});
</script>