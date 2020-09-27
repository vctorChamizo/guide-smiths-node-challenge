import { orientation, state } from "enums";
import { ICoordinate } from "./Coordinate.interface";
import { IRobot } from "./Robot.interface";

export interface IAssignment {
  dimension: ICoordinate;
  robots: IRobot[];
  lostPositions: ICoordinate[];
}
