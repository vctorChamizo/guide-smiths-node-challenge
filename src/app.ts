import express from "express";
import bodyParser from "body-parser";

import logger from "@log";
import { PORT } from "@constants";

import index from "./router";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", index);

app.listen(PORT, () => {
  logger.info(`Running on port ${PORT}`);
});
