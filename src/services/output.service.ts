import fs from "fs";

import { buildAssignment, executeAssigment } from "../utils";
import { IAssignment, IRobot } from "../interfaces";

import { FILE_PATH } from "@constants";

export const getOutputFiles = async () => {
  return fs.readdirSync(`${FILE_PATH}output/`);
};

export const executeInput = async (filename: string): Promise<IRobot[]> => {
  try {
    const data = await fs.readFileSync(`${FILE_PATH}input/${filename}`, {
      encoding: "utf8",
    });

    const assigment: IAssignment = buildAssignment(data);
    const executedAssigment = executeAssigment(assigment);

    fs.writeFileSync(
      `${FILE_PATH}output/executed_${filename}.json`,
      JSON.stringify(executedAssigment)
    );

    return executedAssigment.robots as IRobot[];
  } catch (error) {
    throw error;
  }
};
