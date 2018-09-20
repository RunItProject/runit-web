import IActivityBase from './IActivityBase';
import IPlan from './IPlan';

interface IPlanActivity extends IActivityBase {
    planId: number;
    plan: IPlan | null;
    week: number;
    dayOfWeek: number;
}

export default IPlanActivity;
