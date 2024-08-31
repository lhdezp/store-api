
import { userModel as DB } from "../models/models.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await DB.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getUserByName = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await DB.findOne({ username:name });
        if (!user) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await DB.findOne({ username: name });
        if (user) {
            return res.status(400).json({ message: `User name ${name} exist` });
        }
        const newUSer = await DB.create({ username: name, password });
        res.status(201).json({ message: `User ${name} created successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await DB.findOne({ username:name });
        if (!user) {
            return res.status(404).json({ message: `User ${name} not found` });
        }
        const { password } = req.body;
        const updated = await DB.updateOne({ username:name }, {password});
        res.status(200).json({ message: `User ${name} updated successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await DB.findOneAndDelete({ username:name });
        if (!user) {
            return res.status(404).json({ message: `User ${name} not found` });
        }
        res.status(200).json({ message: `User ${name} deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllUsers, getUserByName, createUser, updateUser, deleteUser };
