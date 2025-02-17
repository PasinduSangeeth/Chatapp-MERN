import mongoose from 'mongoose';

// Connect to MongoDB
export const connectDB=async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB: ${conn.connection.host}');
        
    } catch (error) {
        console.log('Mongodb connection Error:', error);
        
    }
        
};