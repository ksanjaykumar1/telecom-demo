import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';


import authRouter from './routes/authRoutes.js';
// import jobRouter from './routes/jobsRoutes.js';

// middleware
import { notFound } from './middleware/not-found.js';
import errorHandler from './middleware/errorhandler.js';
import connectDB from './db/connect.js';

const port = process.env.PORT || 5000;

// we are doing this because we are using ES6 module and dirname is not accessible by default
const __dirname = dirname(fileURLToPath(import.meta.url));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// app.post('', (req, res) => {
//   console.log(req.body);
//   res.json({ msg: 'Welcome' });
// });

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Welcome' });
});

app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
