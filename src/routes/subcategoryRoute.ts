import express from 'express'
import SubcategoryController from '../controllers/subcategoryController'

const router = express.Router()

// get
router.get('/', SubcategoryController.getAllSubcategories)
router.get('/:id', SubcategoryController.getSubcategoryById)

// // post
router.post('/', SubcategoryController.createSubcategory)

//update
router.put('/:id', SubcategoryController.updateSubcategory)

// // delete
router.delete('/:id', SubcategoryController.deleteSubcategory)

export default router
