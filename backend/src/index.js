// Initiate the server
import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';
import cookieParser from 'cookie-parser';

// Load environment variables from.env file
dotenv.config();

const app = express();

const PORT =process.env.PORT||5002 ;
app.use(express.json());
app.use(cookieParser()); // Parse cookies to req.cookies object
app.use("/api/auth",authRoutes);


app.listen(PORT, () => {
    console.log('Server is running on PORT:'+PORT);
    connectDB()
});