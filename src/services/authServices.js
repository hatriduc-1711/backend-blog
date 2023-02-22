import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../model/Users.js';
import { checkEmail, hashPassword, generateAccessToken, generateRefreshToken } from './services.js';

const Users = mongoose.model('User', User);

const refreshTokens =[];

export const authServices = {
    register : (data) => {
        return new Promise(async (resolve, reject) => {
            try { 
                const check = await checkEmail(data.email)
                if (check) {
                    resolve({
                        code: 1,
                        message: 'Account already exists ! ! !'
                    })
                } else {
                    const newPassword = await hashPassword(data.password)
                    await Users.create({
                        email: data.email,
                        name: data.name,
                        password: newPassword,
                        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/11/08/gau-truc-chibi-dep-nhat_082044963.jpg',
                        role: 'user',
                    });
                    resolve({
                        code: 0,
                        message: 'Successful new creation ! ! !'
                    })
                }
            } catch(e) {
                reject(e);
            }
        })
    },

    login: (data, response) => {
        return new Promise(async (resolve, reject) => {
            try { 
                const check = await checkEmail(data.email);
                if (!check) {
                    resolve({
                        code: 1,
                        message: 'Email is not correct ! ! !'
                    })
                } else {
                    const user = await Users.findOne({ email: data.email});
                    const validPasswordUser = await bcrypt.compare(data.password, user.password);
                    if (!validPasswordUser) {
                        resolve({
                            code: 2,
                            message: 'Password is not correct ! ! !'
                        })
                    } else {
                        const accessToken = generateAccessToken(user);
                        const refreshToken = generateRefreshToken(user);
                        refreshTokens.push(refreshToken);
                        response.cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            secure: false,
                            path: '/',
                            sameSite: 'strict'
                        })

                        const {name, image, ...information} = user._doc

                        resolve({
                            code: 0,
                            message: 'Logged in successfully ! ! !',
                            user: { name: name, image: image},
                            accessToken: accessToken
                        })
                    }
                }
            } catch(err) {
                reject(err);
            }
        })
    },

    refreshToken: (request) => {
        return new Promise((resolve, reject) => {
            try {
                const refreshToken = request.cookies.refreshToken;
                if(!refreshToken) resolve('You are not authenticated ! ! !');
                if(!refreshTokens.includes(refreshToken)) resolve('Refresh token is not valid ! ! !');
                jwt.verify(refreshToken, process.env.REFRESH_KEY_SECRET, (err, user) => {
                    if(err) console.log(err);
                    refreshTokens = refreshTokens.filter(token => token !== refreshToken)

                    const newAccessToken = generateAccessToken(user);
                    const newRefreshToken = generateRefreshToken(user);
                    refreshTokens.push(newRefreshToken);
                    response.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        sameSite: 'strict'
                    })

                    resolve({ accessToken: newAccessToken})
                })
            } catch(err) {
                reject(err);
            }
        })
    },

    logout: (req, res) => {
        return new Promise((resolve, reject) => {
            try {
                // res.clearCookie('refreshToken');
                // refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
                resolve({
                    code: 0,
                    message: 'Logged out ! ! !'
                })
            } catch(err) {
                reject(err);
            }
        })
    }
}
