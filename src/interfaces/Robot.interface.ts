import { Orientation, State, Instructions } from '../enums';
import { ICoordinate } from './Coordinate.interface';

export interface IRobot {
  position: ICoordinate;
  orientation: Orientation;
  instructions: Instructions[];
  state: State;
  path: ICoordinate[];
}
