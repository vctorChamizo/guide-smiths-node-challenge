import fs from 'fs';
import { FILE_PATH } from '@constants';

import { ICoordinate, IRobot } from '../interfaces';
import { State } from '../enums';
import { positionAreEqual } from '../utils';

export const getLostRobots = async (fileName?: string): Promise<number> => {
  const countLostRobot = (robots: IRobot[]): number => {
    return robots.reduce((total, robot) => {
      if (robot.state === State.LOST) total += 1;
      return total;
    }, 0);
  };

  if (!fileName) {
    const listFileName = await fs.readdirSync(`${FILE_PATH}output/`);
    const listBuffer = await Promise.all(
      listFileName.map((fileName) =>
        fs.readFileSync(`${FILE_PATH}output/${fileName}`),
      ),
    );

    return listBuffer.reduce((total, buffer) => {
      const parseBuffer = JSON.parse(buffer.toString());
      total += countLostRobot(parseBuffer.robots);
      return total;
    }, 0);
  }

  const buffer = await fs.readFileSync(`${FILE_PATH}output/${fileName}`, {
    encoding: 'utf8',
  });

  const { robots } = JSON.parse(buffer.toString());

  return countLostRobot(robots);
};

export const getGridExplore = async (fileName?: string): Promise<number> => {
  const countGridExplore = (robots: IRobot[]): number => {
    const gridExplore = [] as ICoordinate[];

    return robots.reduce((total, robot) => {
      const gridRobotExplore = robot.path.reduce((total, coordinate) => {
        if (!gridExplore.find((c) => positionAreEqual(c, coordinate))) {
          total += 1;
          gridExplore.push(coordinate);
        }

        return total;
      }, 0);

      total += gridRobotExplore;

      return total;
    }, 0);
  };

  if (!fileName) {
    const listFileName = await fs.readdirSync(`${FILE_PATH}output/`);
    const listBuffer = await Promise.all(
      listFileName.map((fileName) =>
        fs.readFileSync(`${FILE_PATH}output/${fileName}`),
      ),
    );

    return listBuffer.reduce((total, buffer) => {
      const parseBuffer = JSON.parse(buffer.toString());
      total += countGridExplore(parseBuffer.robots);
      return total;
    }, 0);
  }

  const buffer = await fs.readFileSync(`${FILE_PATH}output/${fileName}`, {
    encoding: 'utf8',
  });

  const { robots } = JSON.parse(buffer.toString());

  return countGridExplore(robots);
};
