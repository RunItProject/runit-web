<template>
    <div :class="['activity', 'activity--type-' + typeKey, {'is-open' : isOpen}]" ref="activity"
        @dragstart="onDrag($event, activity)">
        <div class="activity__header" @click="toggleDetails">
            {{activity.title || "(No title)" }}<span v-if="activity.distance != null"> - {{activity.distance}} km</span>
        </div>
        <div class="activity__body" >
            <div class="activity__details">
                <div class="field">
                    <label class="label is-small">Title</label>
                    <div class="control">
                        <input class="input is-small" type="text" placeholder="Title" v-model="localActivity.title" />
                    </div>
                </div>
                <div class="field">
                    <label class="label is-small">Distance (km)</label>
                    <div class="control">
                        <input class="input is-small" type="number" placeholder="Distance" v-model="localActivity.distance" />
                    </div>
                </div>
                <div class="field">
                    <label class="label is-small">Type</label>
                    <div class="control is-expanded">
                        <div class="select is-fullwidth is-small">
                            <select v-model.number="localActivity.typeId">
                                <option value="1">Easy</option>
                                <option value="2">Long</option>
                                <option value="3">Race</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="activity__options field has-addons">
                <p class="control">
                    <a class="button is-small" @click="onDelete(activity); toggleDetails();">Delete</a>
                </p>
                <p class="control">
                    <a class="button is-small" @click="onMove(activity); toggleDetails();">Move</a>
                </p>
                <p class="control">
                    <a class="button is-small" @click="onSave(activity, localActivity); toggleDetails();">Save</a>
                </p>
            </div>
        </div>
    </div>
</template>

<style>
/* Colors from https://flatuicolors.com/palette/es */
.activity {
    width: 100%;
    font-size: 0.75em;
    border: 1px solid;
    border-radius: 4px;
    border-color: #999;
}
.activity + .activity{
    margin-top: 4px;
}
.activity .activity__header:before {
    background: #999;
}
.activity--type-easy {
    border-color: #34ace0;
}
.activity--type-easy .activity__header:before {
    background: #34ace0;
}
.activity--type-race {
    border-color: #ffb142;
}
.activity--type-race .activity__header:before {
    background: #ffb142;
}
.activity--type-long {
    border-color: #33d9b2;
}
.activity--type-long .activity__header:before {
    background: #33d9b2;
}
.activity__header {
    position: relative;
    padding-left: 12px;
    cursor: pointer;
}
.activity__header:before {
    content: " ";
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 3px;
    width: 7px;
    height: 7px;
    border-radius: 100%;
}
.activity.is-open .activity__header {
    border-bottom: 1px solid #ccc;
}
.activity__body {
    display: none;
    position: absolute;
    left: -1px;
    right: -1px;
    background: white;
    border: 1px solid;
    border-top: none;
    border-color: inherit;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.activity.is-open {
    z-index: 100;
    position: absolute;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.activity.is-open .activity__body {
    display: block;
}

.activity__details {
    padding: .5rem;
}
.activity__details .field:not(:last-child) {
    margin-bottom: 0.5rem;
}
.activity__details .label:not(:last-child) {
    margin-bottom: 0.25rem;
}

.activity__options {
    border-top: 1px solid #ccc;
}
.activity__options .control {
    width: calc(100%/3);
}
.activity__options .control + .control {
    border-left: 1px solid #ccc;
}
.activity__options .control .button {
    width: 100%;
    background: none;
    border: none;
}
.activity__options .control .button:hover {
    font-weight: bold;
}
</style>

<script lang="ts">
import Vue from "vue";
import * as moment from "moment";
import IActivity from "../models/IActivity";

interface IData {
  isOpen: boolean;
  localActivity: IActivity | null;
}

export default Vue.component("actvitity", {
    props: ['activity', 'onDrag', 'onDelete', 'onMove', 'onSave'],
    data: (): IData => {
        return {
            isOpen: false,
            localActivity: null
        };
    },
    methods: {
        toggleDetails(event: PointerEvent) {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                document.addEventListener('click', this.documentClick);
            } else {
                document.removeEventListener('click', this.documentClick);
            }
        },
        documentClick(event: PointerEvent) {
            let el = this.$refs.activity;
            let target = event.target;

            if ((el !== target) && !el.contains(target)) {
                this.isOpen = false;
                document.removeEventListener('click', this.documentClick);

                if (this.isNew) {
                    this.onDelete(this.activity);
                }
            }
        }
    },
    computed: {
        isNew() {
            return this.activity.id == null;
        },
        typeKey() {
            switch(this.activity.typeId) {
                case 1: return "easy";
                case 2: return "long";
                case 3: return "race";
            }
        }
    },
    created () {
        if (this.isNew) {
            this.toggleDetails();
        }
        this.localActivity = Object.assign({}, this.activity);
    },
    destroyed () {
        // important to clean up!!
        document.removeEventListener('click', this.documentClick);
    }
});

</script>