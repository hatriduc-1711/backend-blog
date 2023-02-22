import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../model/Users.js';

const Users = mongoose.model('User', User);

export const checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const emailUser = await Users.findOne({ email: userEmail})
            !!emailUser ? resolve(true) : resolve(false)
        } catch (e) {
            reject(e);
        }
    })
}

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
        } catch (e) {
            reject(e);
        }
    })
}

export const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        name: user.name,
        role: user.role
    },process.env.ACCESS_KEY_SECRET, { expiresIn: '2h'});
}

export const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user._id,
        name: user.name,
        role: user.role
    },process.env.REFRESH_KEY_SECRET, { expiresIn: '365d'});
}