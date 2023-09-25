import express from 'express'
import CategoryController from '../controllers/categoryController'

const router = express.Router()

// get
router.get('/', CategoryController.getAllCategories)
router.get('/:id', CategoryController.getCategoryById)

// // post
router.post('/', CategoryController.createCategory)

//update
router.put('/:id', CategoryController.updateCategory)

// // delete
router.delete('/:id', CategoryController.deleteCategory)

export default router
