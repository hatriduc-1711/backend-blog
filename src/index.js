import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { viewEngine } from './config/viewEngine.js';
import { routes } from './routes/api.js';
import { connectDB } from './config/connectDB.js';
dotenv.config();
const port = process.env.PORT || 9090;
const app = express();

mongoose.set('strictQuery', true);

app.use(cors({ origin: process.env.REACT_URL }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();
viewEngine(app);
routes(app);

app.listen(port);