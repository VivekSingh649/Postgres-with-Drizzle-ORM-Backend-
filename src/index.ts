import express from 'express';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
const allowedOrigins = ['http://localhost:3000', 'https://your-production-url.com'];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use("/api", userRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
