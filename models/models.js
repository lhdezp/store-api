import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: String,
    password: String
});

const ProductSchema = new Schema({
    name:String,
    description: String,
    price: Number,
    urlImage: String
});

const CommentSchema = new Schema({
    author:String,
    title: String,
    content: String
});

const userModel = model("user", UserSchema);
const productModel = model("proudct", ProductSchema);
const commentModel = model("comment", CommentSchema);

export { userModel, productModel, commentModel }
