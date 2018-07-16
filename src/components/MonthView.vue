<template>
<div>
  <div class="month">
    <div class="month__header">
      <button class="button is-small is-outlined" @click="prevMonth" @dragover="prevMonthThrottled">
        <span class="icon">
          <i class="fas fa-chevron-left"></i>
        </span>
      </button>
      <h2 class="title is-size-4">{{date.format("MMMM, YYYY")}}</h2>
      <button class="button is-small is-outlined" @click="nextMonth" @dragover="nextMonthThrottled">
        <span class="icon">
          <i class="fas fa-chevron-right"></i>
        </span>
      </button>
    </div>
    <div class="month__body">
     
      <div class="week" v-for="week in weeks" v-if="!!week" :key="week.isoWeekNo">
           
        <div class="day" v-bind:class="{'day--faded': day.isOutsideMonth}"
             v-for="day in week.days" v-if="!!day" :key="day.date.format('YYYYMMDD')">
          
          <div class="day__header is-size-6 is-clearfix ">
            {{day.date.format("DD")}}
            <small class="is-size-7">{{day.date.format("ddd")}}</small>
            <button v-if="!day.isOutsideMonth" class="button is-outlined is-pulled-right" @click="createActivity(day.date)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          
          <div class="day__body">
            <div class="day__activity-list"
              @drop="onDrop($event, day.date)" @dragover.prevent="onDragOver">
              <activity v-for="activity in getActivitiesForDate(day.date)" :key="activity.id" :activity="activity"
                :onDrag="onDragStart" :draggable="true" 
                :onDelete="deleteActivity" :onSave="saveActivity"  />
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="month__footer">

    </div>
  </div>
</div>
</template>

<style>
.month__header {
  text-align: center;
}
.month__header .title {
  display: inline-block;
  width: 250px;
}
.week {
  clear: both;
}
.day {
  display: inline-block;
  padding: 8px;
  border-color: gray;
  border-top: 1px solid;
  border-left: 1px solid;
  width: 14.285714286%;
}
.day:last-of-type {
  border-right: 1px solid;
}
.week:last-of-type .day {
  border-bottom: 1px solid;
}
.day--faded {
  border-color: gray !important;
}
.day--faded .day__header {
  color: #ccc;
}
.day--faded .day__activity-list {
  opacity: 0.5;
}
.day__header {
  margin-bottom: 4px;
}
.day__header .button {
  font-size: 0.6rem;
}
.day__body {
  position: relative;
}
.day__activity-list {
  height: 70px;
  overflow-y: scroll;
}
</style>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import * as moment from "moment";
import { throttle } from "lodash";
import IActivity from "../models/IActivity";
import Activity from "./Activity.vue";

interface IData {
  date: moment.Moment;
  newActivity: IActivity | null;
}

export default Vue.extend({
  components: {
    Activity
  },
  props: [],
  created() {
    this.$store.dispatch('ACTIVITIES_REQUEST', this.currentUser.id);
  },
  data: (): IData => {
    return {
      date: moment.utc(),
      newActivity: null
    };
  },
  methods: {
    nextMonth() {
      this.date = this.date.clone().add(1, "month");
    },
    nextMonthThrottled: throttle(function() { this.nextMonth() }, 400, { leading: true, trailing: false}),
    prevMonth() {
      this.date = this.date.clone().subtract(1, "month");
    },
    prevMonthThrottled: throttle(function() { this.prevMonth() }, 400, { leading: true, trailing: false}),
    /* CRUD Handling */
    createActivity(date: moment.Moment) {
      this.newActivity = {
        id: null,
        date: date.clone(),
        title: "",
        typeId: null,
        userId: this.currentUser.id,
        distance: 0
      };
    },
    saveActivity(oldActivity: IActivity, updatedActivity: IActivity) {
      if (oldActivity === this.newActivity) {
        updatedActivity.id = 0; // Set id to 0 to let Backend generate id.
        this.$store.dispatch("ACTIVITY_CREATE", updatedActivity).then(() => {
          this.newActivity = null;
        });
      } else {
        this.$store.dispatch("ACTIVITY_UPDATE", updatedActivity);
      }
    },
    deleteActivity(activity: IActivity) {
      if (activity === this.newActivity) {
        this.newActivity = null;
      } else {
        this.$store.dispatch("ACTIVITY_DELETE", activity);
      }
    },
    getActivitiesForDate(date: moment.Moment) {
      if (! this.activities) return [];
      let activities = (this.activities as IActivity[]).filter(activity =>
        moment(activity.date).isSame(date, "day")
      );
      if (this.newActivity && this.newActivity.date.isSame(date, "day")) {
        activities.push(this.newActivity);
      }
      return activities;
    },
    /* Drag and drop handling */
    onDragStart(event: DragEvent, activity: IActivity) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text", activity.id.toString());
    },
    onDrop(event: DragEvent, date: moment.Moment) {
      let draggedActivityId = Number.parseInt(
        event.dataTransfer.getData("text")
      );
      let draggedActivity = (this.activities as IActivity[]).find(
        activity => activity.id == draggedActivityId
      );

      if (draggedActivity) {
        let updatedActivity = draggedActivity;
        updatedActivity.date = date.clone();
        this.saveActivity(draggedActivity, updatedActivity)
      }
    },
    onDragOver(event: DragEvent) {
      event.dataTransfer.dropEffect = "move";
    }
  },
  computed: {
    weeks() {
      return generateWeeks(this.date);
    },
    ...mapState<any>({
      activities: state => state.activity.activities,
      currentUser: state => state.user.user
    })
  }
});

function generateWeeks(date: moment.Moment) {
  let weeks: any = [];
  const firstWeekStart = date
    .clone()
    .startOf("month")
    .startOf("isoWeek");
  const lastWeekEnd = date
    .clone()
    .endOf("month")
    .endOf("isoWeek");

  for (let i = firstWeekStart.clone(); i <= lastWeekEnd; i.add(1, "day")) {
    if (weeks[i.isoWeek()] == null) {
      weeks[i.isoWeek()] = {
        days: [],
        isoWeekNo: i.isoWeek()
      };
    }

    weeks[i.isoWeek()].days[i.isoWeekday()] = {
      date: i.clone(),
      isOutsideMonth: i.month() !== date.month()
    };
  }

  return weeks;
}
</script>