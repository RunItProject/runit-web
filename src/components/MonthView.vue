<template>
<div>
  <div class="month">
    <div class="month__header">
      <button class="button is-small is-outlined" @click="prevMonth" @dragover="prevMonthThrottled">
        <span class="fas fa-chevron-left"></span>
      </button>
      <h2 class="title is-size-4">{{date.format("MMMM, YYYY")}}</h2>
      <button class="button is-small is-outlined" @click="nextMonth" @dragover="nextMonthThrottled">
        <span class="fas fa-chevron-right"></span>
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
.month {
  padding: 20px;
}
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
import * as moment from "moment";
import throttle  from "lodash.throttle";
import Activity from "./Activity.vue";

interface IActivity {
  id: number;
  date: moment.Moment;
  title: string;
  type: string;
  distance: number;
}
interface IData {
  date: moment.Moment;
  activities: IActivity[];
  newActivity: null;
}

export default Vue.extend({
  components: {
    Activity
  },
  props: [],
  data: (): IData => {
    return {
      date: moment(new Date(2018, 3, 1)),
      activities: [
        {
          id: 0,
          date: moment("2018-04-13"),
          title: "C25K Week 6 Day 3",
          type: "easy",
          distance: 3.2
        },
        {
          id: 1,
          date: moment("2018-04-16"),
          title: "C25K Week 7 Day 1",
          type: "easy",
          distance: 4
        },
        {
          id: 2,
          date: moment("2018-04-18"),
          title: "C25K Week 7 Day 2",
          type: "long",
          distance: 4
        },
        {
          id: 3,
          date: moment("2018-05-05"),
          title: "Lundaloppet 5k",
          type: "race",
          distance: 5
        }
      ],
      newActivity: null,
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
        date: date,
        title: "",
        type: null,
        distance: null
      };
    },
    saveActivity(oldActivity: IActivity, updatedActivity: IActivity) {
      if (oldActivity === this.newActivity) {
        let nextId = Math.max(
          0, ...(this.activities as IActivity[]).map(function(activity){return activity.id;})
        ) + 1;

        this.activities.push(Object.assign({}, updatedActivity, {id:nextId}));
        this.newActivity = null;
      }
      Object.assign(oldActivity, updatedActivity);
    },
    deleteActivity(activity: IActivity) {
      if (activity === this.newActivity) {
        this.newActivity = null;
      } else {
        (this.activities as IActivity[]).splice(this.activities.indexOf(activity), 1);
      }
    },
    getActivitiesForDate(date: moment.Moment) {
      let activities = (this.activities as any[]).filter(activity =>
        activity.date.isSame(date, "day")
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
        draggedActivity.date = date.clone();
      }
    },
    onDragOver(event: DragEvent) {
      event.dataTransfer.dropEffect = "move";
    }
  },
  computed: {
    weeks() {
      return generateWeeks(this.date);
    }
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