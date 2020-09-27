import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Enviroment
export const PORT = process.env.PORT || '3000';

// Files path
export const FILE_PATH = path.join(__dirname, '../data/');

// Info Message
export const SUCCESSFUL_OP = 'Operation successful';

// Extreme Values
export const MAX_COORDINATE = process.env.MAX_COORDINATE || 50;
export const MAX_INSTRUCTIONS = process.env.MAX_INSTRUCTIONS || 100;
export const OUT_OF_RANGE = 'The value it´s out of range';
export const MISSING_DATA = 'Data requiered';
