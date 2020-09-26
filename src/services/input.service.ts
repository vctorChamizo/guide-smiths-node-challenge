import fs from "fs";

import { FILE_PATH } from "@constants";

export const getInputFiles = async () => {
  return fs.readdirSync(`${FILE_PATH}input/`);
};
