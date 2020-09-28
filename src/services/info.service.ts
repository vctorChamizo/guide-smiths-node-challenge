import fs from 'fs';
import { FILE_PATH, MISSING_DATA } from '@constants';

import { MissingDataError } from '../errors';

import { IRobot } from '../interfaces';
import { Instructions, State } from '../enums';

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

  const buffer = await fs.readFileSync(`${FILE_PATH}input/${fileName}`, {
    encoding: 'utf8',
  });

  const { robots } = JSON.parse(buffer.toString());

  return countLostRobot(robots);
};

export const getGridExplore = async (data: any, filename: string) => {
  if (!data) throw new MissingDataError(MISSING_DATA);

  const { x, y } = data.dimension;
  const dimension = `${x} ${y}`;

  const robots = data.robots as IRobot[];

  const parseRobot = robots.map((robot) => {
    const instructions = robot.instructions
      .filter((instruction) => Instructions[instruction])
      .join('');

    const { x, y } = robot.position;
    const position = `${x} ${y}`;

    const orientation = robot.orientation.toString();

    return `${position} ${orientation}\n${instructions}`;
  });

  const inputFile = `${dimension} ${parseRobot.reduce(
    (acc: string, value: string) => {
      acc += `\n${value}`;
      return acc;
    },
    '',
  )}`;

  await fs.writeFileSync(`${FILE_PATH}input/${filename}`, inputFile);
};
