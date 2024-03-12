import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import authRouter from './routes/authRoutes.js';
// import jobRouter from './routes/jobsRoutes.js';

// middleware
import { notFound } from './middleware/not-found.js';
import errorHandler from './middleware/errorhandler.js';
import connectDB from './db/connect.js';

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.post('', (req, res) => {
  console.log(req.body);
  res.json({ msg: 'Welcome' });
});

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Welcome' });
});

app.use('/api/v1/auth', authRouter);

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
