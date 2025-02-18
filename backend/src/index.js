// Initiate the server
import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';

// Load environment variables from.env file
dotenv.config();

const app = express();

const PORT =process.env.PORT||5002 ;
app.use(express.json());
app.use("/api/auth",authRoutes);


app.listen(PORT, () => {
    console.log('Server is running on PORT:'+PORT);
    connectDB()
});