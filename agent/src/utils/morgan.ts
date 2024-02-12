import morgan, { StreamOptions } from 'morgan';
import Logger from './loggers';
import { Request } from 'express';

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message),
};

morgan.token('body', (req: Request) => JSON.stringify(req.body));
morgan.token('ip', (req: Request) => req.ip);
// Build the morgan middleware
const morganMiddleware = morgan(
  ':ip :method :url :status :response-time ms - :res[content-length] :body - :req[content-length]',
  { stream }
);

export default morganMiddleware;
