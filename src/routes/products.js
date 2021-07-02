// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer=require('multer')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer ************
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      let newFileName=file.fieldname + '-' + Date.now()+'.png'
      cb(null, newFileName)
    }
  })

let upload=multer({storage:storage})

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.single('image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:identificador/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
