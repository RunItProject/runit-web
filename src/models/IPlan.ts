import IPlanActivity from './IPlanActivity';
import IUserPlanSubscription from './IUserPlanSubscription';

interface IPlan {
    id: number;
    name: string;
    activities: IPlanActivity[];
    userPlanSubscriptions: IUserPlanSubscription[];
}

export default IPlan;
