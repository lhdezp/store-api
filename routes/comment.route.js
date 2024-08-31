
import { Router } from "express"

import { getAllComments,
         createComment,
         deleteAllComments } from "../controllers/comment.controller.js"

const router = Router();


router.get('/', getAllComments);

router.post('/', createComment);

router.delete('/', deleteAllComments);


export { router };