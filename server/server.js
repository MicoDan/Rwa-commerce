import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRouter.js';
import morgan from 'morgan';

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI 
mongoose.connect(MONGODB_URI)

.then(()=> {
  console.log('connected to db');
})
.catch((err)=>{
  console.log(err.message);
})


const app = express();
app.use(cors({origin: "http://localhost:5000"}));
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/seed', seedRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.get("/api/keys/google", (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || "" });
});

app.get('./api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || sb)
})

//when a user types in the above endpoint they will be directed t o the seedRouter


const port = 5000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});


app.use((err, req, res, next)=>{
  res.status(500).send({message: err.message})
})
