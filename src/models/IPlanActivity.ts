import * as moment from 'moment';
import IActivityBase from './IActivityBase';
import IPlan from './IPlan';

interface IPlanActivity extends IActivityBase {
    planId: number;
    plan: IPlan;
    week: number;
    dayOfWeek: number;
}

export default IPlanActivity;
