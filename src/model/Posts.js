import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const Posts = new Schema({
    title: { type: String, required: true },
    html: { type: String, required: true },
    text: { type: String, required: true},
    author: { type: Object, required: true},
    background: { type: String, max: 300 },
    view: { type: Number, required: true}
}, { timestamps: true });

