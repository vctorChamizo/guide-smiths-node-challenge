import { Application } from "express";

import * as routes from "../router";
import { IRouter } from "../interfaces/config";

export const router = (app: Application): void => {
  Object.values(routes).forEach((router: IRouter) =>
    app.use(router.path, router.router)
  );
};
