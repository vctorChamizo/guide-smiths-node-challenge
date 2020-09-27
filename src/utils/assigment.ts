import _ from 'lodash';

import { MAX_INSTRUCTIONS, OUT_OF_RANGE, MAX_COORDINATE } from '@constants';

import { IAssignment, IRobot, ICoordinate } from '../interfaces';
import { Instructions, State, Orientation } from '../enums';
import { MissingDataError } from '../errors';

const positionAreEqual = (position: ICoordinate, newPosition: ICoordinate) => {
  return position.x === newPosition.x && position.y === newPosition.y;
};

const isOutOfRange = (extreme: ICoordinate, currentPosition: ICoordinate) => {
  return (
    extreme.x < currentPosition.x ||
    extreme.y < currentPosition.y ||
    currentPosition.x < 0 ||
    currentPosition.y < 0
  );
};

const updateOrientationRobot = (
  orientation: Orientation,
  direction: Instructions,
): Orientation => {
  switch (orientation) {
    case Orientation.N:
      return direction === Instructions.R ? Orientation.E : Orientation.W;

    case Orientation.S:
      return direction === Instructions.R ? Orientation.W : Orientation.E;

    case Orientation.E:
      return direction === Instructions.R ? Orientation.S : Orientation.N;

    case Orientation.W:
      return direction === Instructions.R ? Orientation.N : Orientation.S;

    default:
      return orientation;
  }
};

const forwardRobot = (
  orientation: Orientation,
  coordinate: ICoordinate,
): ICoordinate => {
  const { x, y } = coordinate;

  switch (orientation) {
    case Orientation.N:
      return { x, y: y + 1 };

    case Orientation.S:
      return { x, y: y - 1 };

    case Orientation.E:
      return { x: x + 1, y };

    case Orientation.W:
      return { x: x - 1, y };

    default:
      return { x, y };
  }
};

export const buildAssignment = (data: String): IAssignment => {
  const arrayData = data.split('\n');

  const [x, y] = arrayData[0].split(' ');

  const robots: IRobot[] = [];

  let i = 1;
  while (i < arrayData.length) {
    const [x, y, o] = arrayData[i].split(' ');

    if (x > MAX_COORDINATE || y > MAX_COORDINATE)
      throw new MissingDataError(OUT_OF_RANGE);

    const position: ICoordinate = { x: Number(x), y: Number(y) };
    const orientation: Orientation = (<any>Orientation)[o];
    const instructions: Instructions[] = arrayData[i + 1]
      .split('')
      .map((e) => (<any>Instructions)[e]);

    if (instructions.length > MAX_INSTRUCTIONS)
      throw new MissingDataError(OUT_OF_RANGE);

    robots.push({
      position,
      orientation,
      instructions,
      state: State.ON,
      path: [],
    });

    i += 2;
  }

  return {
    dimension: { x: Number(x), y: Number(y) },
    robots,
    lostPositions: [],
  };
};

export const executeAssigment = (assigment: IAssignment): IAssignment => {
  const exploreRobots = assigment.robots.map((robot) => {
    if (robot.state === State.ON) {
      robot.path?.push(robot.position);

      const { instructions } = robot;

      for (let i = 0; i < instructions.length; ++i) {
        if (instructions[i] === Instructions.F) {
          const newPosition: ICoordinate = forwardRobot(
            robot.orientation,
            robot.position,
          );

          if (
            !assigment.lostPositions.find((p) =>
              positionAreEqual(p, newPosition),
            )
          ) {
            if (isOutOfRange(assigment.dimension, newPosition)) {
              robot.state = State.LOST;
              assigment.lostPositions.push(newPosition);
              break;
            } else {
              robot.position = newPosition;
              robot.path.push(newPosition);
            }
          }
        } else {
          robot.orientation = updateOrientationRobot(
            robot.orientation,
            instructions[i],
          );
        }
      }

      if (robot.state === State.ON) robot.state = State.OFF;
    }

    return robot;
  }) as IRobot[];

  assigment.robots = exploreRobots.map((robot) =>
    _.pick(robot, ['position', 'orientation', 'state', 'path']),
  ) as IRobot[];

  return assigment;
};
