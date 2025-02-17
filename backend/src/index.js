// Initiate the server
import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';

// Load environment variables from.env file
dotenv.config();

const app = express();
const PORT =process.env.PORT ;
app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
    console.log('Server is running on PORT:'+PORT);
});