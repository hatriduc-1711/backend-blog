import { userServices } from "../services/userServices.js";

export const userController = {
    getAllPosts: async (req, res) => {
        try {
            const response = await userServices.getAllPosts(req.query.page);
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    getPosts: async (req, res) => {
        try {
            const response = await userServices.getPosts(req.query.id);
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    createPosts: async (req, res) => {
        try {
            const response = await userServices.createPosts(req.body);
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    updateView: async (req, res) => {
        try {
            const response = await userServices.updateView(req.query.id);
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}