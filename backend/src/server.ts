import express, { Router } from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user.routes';
import vikendiceRouter from './routes/vikendice.routes';
import { RezervacijeController } from './controllers/rezervacje.controller';
import rezervacijeRouter from './routes/rezervacije.router';

const app = express()
app.use(express.json({limit: '50mb'}))
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
mongoose.connect("mongodb://127.0.0.1:27017/projekat")
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("db connection ok")
})

const router = Router()
router.use('/user', userRouter)
router.use('/vikendice', vikendiceRouter)
router.use('/rezervacije', rezervacijeRouter)    
app.use('/', router)

app.listen(4000, () => console.log(`Express server running on port 4000`));