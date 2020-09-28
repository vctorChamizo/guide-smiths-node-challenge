import fs from 'fs';
import { FILE_PATH, MISSING_DATA } from '@constants';

import { buildAssignment, executeAssigment } from '../utils';
import { IAssignment, IRobot } from '../interfaces';
import { MissingDataError } from '../errors';

export const getOutputFiles = async () => {
  return fs.readdirSync(`${FILE_PATH}output/`);
};

export const executeInput = async (fileName: string): Promise<IRobot[]> => {
  if (!fileName) throw new MissingDataError(MISSING_DATA);

  const data = await fs.readFileSync(`${FILE_PATH}input/${fileName}`, {
    encoding: 'utf8',
  });

  const assigment: IAssignment = buildAssignment(data);
  const executedAssigment = executeAssigment(assigment);

  fs.writeFileSync(
    `${FILE_PATH}output/executed_${fileName}.json`,
    JSON.stringify(executedAssigment),
  );

  return executedAssigment.robots as IRobot[];
};
