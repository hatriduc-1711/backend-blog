import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log('connect success')
    } catch (e) {
        console.log('connect failed')
    }
}