import fs from "fs";

import { buildAssignment } from "../utils";
import { IAssignment } from "interfaces/Assignment.interface";

import { FILE_PATH } from "@constants";

export const getOutputFiles = async () => {
  return fs.readdirSync(`${FILE_PATH}output/`);
};

export const executeInput = async (filename: string) /*: IScannig[]*/ => {
  try {
    const stream = await fs.createReadStream(`${FILE_PATH}input/${filename}`, {
      encoding: "utf8",
    });

    stream.on("data", (chunk) => {
      const assigment: IAssignment = buildAssignment(chunk.toString());
    });
  } catch (error) {
    throw error;
  }
};
