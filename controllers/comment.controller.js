
import { commentModel as DB } from "../models/models.js";

const getAllComments = async (req, res) => {
    try {
        const users = await DB.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};


const createComment = async (req, res) => {
    try {
        const { author, title, content } = req.body;
        const comment = await DB.create({ author, title, content });
        res.status(201).json({ message: `Comment created successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllComments = async (req, res) => {
    try {
        const comment = await DB.deleteMany();
        res.status(200).json({ message: `Comments deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllComments,  createComment, deleteAllComments };
