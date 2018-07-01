<template>
<div class="container is-fluid">
    <h1 class="is-size-3">Plans</h1>
    <div v-for="plan in plans" :key="plan.id">
      <router-link :to="{ path: 'plans/' + plan.id }" class="navbar-item">{{plan.name}}</router-link>
    </div>
</div>
</template>

<style>
</style>

<script lang="ts">
import Vue from "vue";
import * as moment from "moment";
import PlanEditorTable from "./PlanEditor/PlanEditorTable.vue";
import IPlan from "../../models/IPlan";

interface IData {
  plans: IPlan[]
}

export default Vue.extend({
  components: {},
  props: [],
  data: (): IData => {
    return {
      plans: dummyPlans
    };
  },
  methods: {}
});

let dummyPlans: IPlan[] = [
  {
    id: 1,
    name: "2 week 5k plan",
    activities: [],
    userPlanSubscriptions: []
  },
  {
    id: 2,
    name: "Hal Higdon 5K Plan",
    activities: [],
    userPlanSubscriptions: []
  },
  {
    id: 3,
    name: "Hal Higdon 10K Plan",
    activities: [],
    userPlanSubscriptions: []
  },
  {
    id: 4,
    name: "Hal Higdon Half-Marathon Plan",
    activities: [],
    userPlanSubscriptions: []
  },
  {
    id: 5,
    name: "Hal Higdon Marathon Plan",
    activities: [],
    userPlanSubscriptions: []
  }
];
</script>
