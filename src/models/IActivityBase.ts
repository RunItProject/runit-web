import * as moment from 'moment';
import IActivityType from './IActivityType';

interface IActivityBase {
  id: number;
  title: string;
  typeId: number;
  type: IActivityType | null;
  distance: number;
}

export default IActivityBase;
