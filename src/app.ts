import express from 'express';
import bodyParser from 'body-parser';

import logger from '@log';
import { PORT } from '@constants';

import index from './router';
import { handleError } from './errors';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);

handleError(app);

app.listen(PORT, () => {
  logger.info(`Running on port ${PORT}`);
});
