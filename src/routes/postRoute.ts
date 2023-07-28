import express from 'express';
import PostsController from '../controllers/postsController';
import upload from '../utils/multer';
import { verifyToken } from '../utils/verifyToken';



const router = express.Router();

// search filter
router.get('/search', PostsController.searchQuery);


// get
router.get('/allPosts', PostsController.getAllPosts);
router.get('/post/:id', PostsController.getPostById)
router.get('/postAuthor/:id', verifyToken, PostsController.getPostByAuthor)



// post
router.post('/create', upload.array('images', 5), verifyToken, PostsController.createPost);


// update
router.post('/update/:id', upload.array('images', 5), PostsController.updatePost);


// delete
router.delete('/delete/:id', verifyToken, PostsController.deletePost)


export default router