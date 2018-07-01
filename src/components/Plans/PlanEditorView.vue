<template>
<div class="container is-fluid">
  <h3 class="is-size-4">{{plan.name}}</h3>
  <div v-for="(week, weekIndex) in orderedWeeks" :key="weekIndex">
    <h4 class="is-size-5">Week {{weekIndex}}</h4>
    <div class="plan-list-item" v-for="activity in week" :key="activity.id">
      <div class="select is-small">
        <weekday-selector v-model="activity.dayOfWeek" @change="sortWeek(weekIndex);"/>
      </div>
      <input class="input is-small" type="text" v-model="activity.title" placeholder="Title" />
      <div class="select is-small">
        <activity-type-selector v-model="activity.typeId" />
      </div>
      <input class="input is-small" type="number" min="0" v-model.number="activity.distance" placeholder="Distance" /> km
    </div>
    <div>
      <a @click="addActivity(weekIndex)">Add activity</a>
    </div>
    <br />
  </div>
  <div>
    <a @click="addWeek">Add week</a>
  </div>
  <button @click="savePlan">Spara</button>
</div>
</template>

<style>
.plan-list-item {
  margin-bottom: 0.75rem;
}
.plan-list-item .input {
  display: inline-block;
  width: 200px;
}
</style>

<script lang="ts">
import Vue from "vue";
import * as moment from "moment";
import groupBy from "lodash.groupby";
import IPlan from "../../models/IPlan";
import IPlanActivity from "../../models/IPlanActivity";
import ActivityTypeSelector from "../ActivityTypeSelector.vue";
import WeekdaySelector from "../WeekdaySelector.vue";

interface IData {
  plan: IPlan;
  weeks: any;
  nextId: Number;
}

export default Vue.extend({
  components: { ActivityTypeSelector, WeekdaySelector },
  props: [],
  data: (): IData => {
    return {
      plan: staticPlan,
      weeks: {},
      nextId: 0
    };
  },
  methods: {
    addActivity(weekIndex: number) {
      let activity: IPlanActivity = {
        planId: 1,
        plan: null,
        week: weekIndex,
        dayOfWeek: 1,
        id: this.nextId,
        title: "",
        type: null,
        typeId: 0,
        distance: 0
      };
      this.weeks[weekIndex].push(activity);
      this.nextId -= 1;
    },
    addWeek() {
      this.weeks.push([]);
    },
    savePlan() {
      throw "Not yet implemented";
    },
    sortWeek(weekIndex: number) {
      (this.weeks as IPlanActivity[][])[weekIndex].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
    },
    handleWeekdayChange() {
      console.log("change");
    }
  },
  computed: {
    orderedWeeks() {
      let orderedWeeks = Object.assign([], this.weeks);
      orderedWeeks.forEach((week: IPlanActivity[]) => {
        week.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
      });

      return orderedWeeks;
    }
  },
  created() {
    this.weeks = Object.values(groupBy(this.plan.activities, "week"));
    console.log(this.weeks);
  }
});

const staticPlan: IPlan = {
  id: 1,
  name: "2 week 5k plan",
  activities: [
    {
      planId: 1,
      plan: null,
      week: 0,
      dayOfWeek: 1,
      id: 1,
      title: "Week 1 Day 1",
      type: {
        id: 1,
        name: "easy"
      },
      typeId: 1,
      distance: 3
    },
    {
      planId: 1,
      plan: null,
      week: 0,
      dayOfWeek: 3,
      id: 2,
      title: "Week 1 Day 2",
      type: {
        id: 1,
        name: "easy"
      },
      typeId: 1,
      distance: 3
    },
    {
      planId: 1,
      plan: null,
      week: 0,
      dayOfWeek: 5,
      id: 3,
      title: "Week 1 Day 1",
      type: {
        id: 2,
        name: "long"
      },
      typeId: 2,
      distance: 5
    },
    {
      planId: 1,
      plan: null,
      week: 1,
      dayOfWeek: 1,
      id: 4,
      title: "Week 2 Day 1",
      type: {
        id: 1,
        name: "easy"
      },
      typeId: 1,
      distance: 4
    },
    {
      planId: 1,
      plan: null,
      week: 1,
      dayOfWeek: 3,
      id: 5,
      title: "Week 2 Day 2",
      type: {
        id: 1,
        name: "easy"
      },
      typeId: 1,
      distance: 4
    },
    {
      planId: 1,
      plan: null,
      week: 2,
      dayOfWeek: 5,
      id: 6,
      title: "Week 2 Day 3",
      type: {
        id: 2,
        name: "long"
      },
      typeId: 2,
      distance: 5
    }
  ] as IPlanActivity[],
  userPlanSubscriptions: []
};
</script>