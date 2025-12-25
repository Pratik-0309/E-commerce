import express from 'express'
import {addProduct, listProduct, removeProduct, singleProduct} from "../controllers/productController.js"

const router = express.Router();

router.post('/add',addProduct)
router.get('/list',listProduct)
router.delete('/remove',removeProduct)
router.get('/single/:id',singleProduct)

export default router