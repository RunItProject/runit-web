import * as moment from 'moment';
import IActivityBase from './IActivityBase';
import IUser from './IUser';
import IUserPlanSubscription from './IUserPlanSubscription';

interface IActivity extends IActivityBase {
  date: moment.Moment;
  userId: number;
  user: IUser;
  userPlanSubscription: IUserPlanSubscription;
  userPlanSubscriptionId: number;
}

export default IActivity;
