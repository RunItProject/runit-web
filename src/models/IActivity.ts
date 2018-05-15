import * as moment from 'moment';
import IActivityType from './IActivityType';
import IUser from './IUser';

interface IActivity {
  id: number;
  date: moment.Moment;
  title: string;
  typeId: number;
  type: IActivityType;
  distance: number;
  userId: number;
  user: IUser;
}

export default IActivity;
