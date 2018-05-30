<template>
<div class="container is-fluid">
    <h1 class="is-size-3">Plans</h1>
    <plan-editor-table></plan-editor-table>
</div>
</template>

<style>

</style>

<script lang="ts">
import Vue from "vue";
import * as moment from "moment";
import PlanEditorTable from "./PlanEditor/PlanEditorTable.vue";

interface IData {
    
}

export default Vue.extend({
  components: {
      PlanEditorTable
  },
  props: [],
  data: (): IData => {
    return {};
  },
  methods: {
  }
});
</script>