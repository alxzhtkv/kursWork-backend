import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './user/user.router';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv'
import {User, UserAttributes } from './user/user.model';

var cookieParser = require('cookie-parser')

const app = express();
dotenv.config()

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())

app.use(userRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app