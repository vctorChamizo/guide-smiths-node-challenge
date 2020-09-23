import { orientation, state } from "enums";

export interface IRobot {
  position: ICoordinate;
  orientation: orientation;
  state: state;
  path: [ICoordinate];
}

export interface ICoordinate {
  x: Number;
  y: Number;
}
