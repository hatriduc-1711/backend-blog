import mongoose from 'mongoose';
import {Posts} from '../model/Posts.js'

const Post = mongoose.model('Posts', Posts);

export const userServices = {
    getAllPosts: (page) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (page) {
                    const totalDocuments = await Post.countDocuments();
                    let pageInt = parseInt(page);
                    const pageSize = 8;
                    const totalPages = Math.ceil(totalDocuments / pageSize);

                    if (pageInt <= 1) pageInt = 1;

                    const listPosts = await Post.find({})
                        .skip((pageInt - 1) * pageSize)
                        .limit(pageSize);
                    resolve({
                        totalPages: totalPages,
                        listPosts: listPosts,
                    }) 
                } else {
                    const listPosts = await Post.find({});
                    resolve(listPosts);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    getPosts: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const posts = await Post.findOne({ _id: id});
                resolve(posts);
            } catch (err) {
                reject(err);
            }
        })
    },

    createPosts: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Post.create({
                    title: data.title,
                    html: data.html,
                    text: data.text,
                    author: data.author,
                    background: !!data.background ? data.background : 'https://tevily.web4s.vn/wp-content/uploads/2021/09/image-4.jpg',
                    view: 0,
                });
                resolve({
                    code: 0,
                    message: 'Successful new creation ! ! !'
                });
            } catch (err) {
                reject(err);
            }
        })
    },

    updateView: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const posts = await Post.findOne({ _id: id })
                posts.view += 1;
                posts.save();
                resolve({
                    code: 0,
                    message: 'Successful ! ! !'
                });
            } catch (err) {
                reject(err);
            }
        })
    },
}