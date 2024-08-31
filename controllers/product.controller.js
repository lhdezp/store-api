
import { productModel as DB } from "../models/models.js";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const getAllProducts = async (req, res) => {
    try {
        const products = await DB.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductByName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await DB.find({ name });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const createProduct = async (req, res) => {
//     try {
//         const { name, price, description } = req.body;
//         if (!name || !price || !description) {
//             return res.status(400).json({ message: 'Please provide name, price, and description for the product' });
//         }
//         const productExists = await DB.findOne({ name });
//         if (productExists) {
//             return res.status(400).json({ message: 'Product already exists' });
//         }
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const urlImage = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
//         req.fileName = urlImage;
//         const newProduct = await DB.create({ name, price, description, urlImage: `./public/product/${urlImage}` });
//         res.status(201).json(newProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/product/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const urlImage = 'product-' + uniqueSuffix + path.extname(file.originalname);
        req.fileName = urlImage;
        cb(null, urlImage);
    }
});

const upload = multer({ storage: storage });

const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !price || !description) {
            return res.status(400).json({ message: 'Please provide name, price and description for the product' });
        }
        const productExists = await DB.findOne({ name });
        if (productExists) {
            if (productExists.urlImage !== "/public/product/default.jpg") {
                fs.unlink(path.join('public/product/', req.fileName), (err) => {
                    if (err) console.error(err);
                });
            }
            return res.status(400).json({ message: 'Product already exists' });
        }
        const urlImage = `/public/product/${req.fileName ?? "default.jpg"}`;
        const newProduct = await DB.create({ name, price, description, urlImage });
        res.status(201).json(newProduct);
    } catch (error) {
        if (req.fileName) {
            fs.unlink(path.join('public/product/', req.fileName), (err) => {
                if (err) console.error(err);
            });
        }
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name } = req.params;
        if (!name) {
            res.status(400).json({ message: 'Please provide a product name' });
        }
        const product = await DB.findOne({ name });
        if (!product) {
            return res.status(404).json({ message: `Product ${name} not found` });
        }
        const { price, description } = req.body;
        const updatedProduct = await DB.findOneAndUpdate(
            { name },
            { price, description }
        );
        if (!updatedProduct) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: "Product updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { name } = req.params;
        const deleted = await DB.findOneAndDelete({ name });
        if (!deleted) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllProducts, getProductByName, createProduct, updateProduct, deleteProduct, upload };
