import express from 'express'
import PostsController from '../controllers/postsController'
import upload from '../utils/multer'
import { verifyTokenMitra } from '../utils/verifyTokenMitra'

const router = express.Router()

// search filter
//router.get('/search', PostsController.searchQuery)

// get
router.get('/allPosts', PostsController.getAllPosts)
router.get('/post/:id', PostsController.getPostById)
router.get('/postAuthor/:id', verifyTokenMitra, PostsController.getPostByAuthor)

// // post
router.post(
  '/create',
  upload.array('images', 5),
  verifyTokenMitra,
  PostsController.createPost
)

//update
router.post(
  '/update/:id',
  upload.array('images', 5),
  verifyTokenMitra,
  PostsController.updatePost
)

// // delete
router.delete('/delete/:id', verifyTokenMitra, PostsController.deletePost)

export default router
