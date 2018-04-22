import * as moment from 'moment';

interface IActivity {
  id: number;
  date: moment.Moment;
  title: string;
  type: string;
  distance: number;
}

export default IActivity;
