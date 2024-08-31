
import { Router } from "express";
import { getAllProducts, 
         getProductByName,
         createProduct,
         updateProduct,
         deleteProduct,
         upload} from "../controllers/product.controller.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = Router();

// Get all products
router.get('/', getAllProducts);

// Get product by name
router.get("/:name", getProductByName)

// Create new product
router.post("/", validateJWT, upload.single('file'), createProduct);

// Update product by name
router.patch("/:name", validateJWT, updateProduct);

// Delete product by name
router.delete("/:name", validateJWT, deleteProduct);

export {router};
