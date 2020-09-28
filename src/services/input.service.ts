import fs from 'fs';
import { FILE_PATH, MISSING_DATA } from '@constants';

import { MissingDataError } from '../errors';

import { IRobot } from '../interfaces';
import { Instructions } from '../enums';

export const getInputFiles = async () => {
  return fs.readdirSync(`${FILE_PATH}input/`);
};

export const createInputFile = async (data: any, filename: string) => {
  console.log(filename);
  if (!data || !filename) throw new MissingDataError(MISSING_DATA);

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
