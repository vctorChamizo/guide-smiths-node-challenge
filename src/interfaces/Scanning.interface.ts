import { Orientation, State } from "enums";
import { ICoordinate } from "./Coordinate.interface";

export interface IScannig {
  position: ICoordinate;
  orientation: Orientation;
  state?: State;
}
