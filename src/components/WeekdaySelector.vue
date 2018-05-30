<template>
    <select v-bind:value="value" @input="$emit('input', $event.target.value)" @change="$emit('change', $event)">
        <option value="0">Sunday</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
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