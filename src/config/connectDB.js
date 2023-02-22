import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/blog_sever');
        console.log('connect success')
    } catch (e) {
        console.log('connect failed')
    }
}