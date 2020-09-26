import { IAssignment, IRobot, ICoordinate } from "../interfaces";
import { Instructions, State, Orientation } from "../enums";
import { MissingDataError } from "../errors";

import { MAX_INSTRUCTIONS, OUT_OF_RANGE, MAX_COORDINATE } from "@constants";

export const buildAssignment = (data: String): IAssignment => {
  try {
    const arrayData = data.split("\n");

    const [x, y] = arrayData[0].split(" ");

    const robots: IRobot[] = [];

    let i = 1;
    while (i < arrayData.length) {
      const [x, y, o] = arrayData[i].split(" ");

      if (x > MAX_COORDINATE || y > MAX_COORDINATE)
        throw new MissingDataError(OUT_OF_RANGE);

      const position: ICoordinate = { x: Number(x), y: Number(y) };
      const orientation: Orientation = (<any>Orientation)[o];
      const instructions: Instructions[] = arrayData[i + 1]
        .split("")
        .map((e) => (<any>Instructions)[e]);

      if (instructions.length > MAX_INSTRUCTIONS)
        throw new MissingDataError(OUT_OF_RANGE);

      robots.push({
        position,
        orientation,
        instructions,
        state: State.ON,
      });

      i += 2;
    }

    return {
      dimension: { x: Number(x), y: Number(y) },
      robots,
    };
  } catch (error) {
    throw error;
  }
};

export const executeAssigment = (assigment: IAssignment) /*: IScannig[]*/ => {};
