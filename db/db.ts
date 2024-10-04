import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:3001/test', {});
    console.log('Connected to MongoDB');
  } catch (error : any) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connectDB;