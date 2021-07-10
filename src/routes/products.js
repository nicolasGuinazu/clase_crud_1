// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer=require('multer')
const {body}=require('express-validator')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Validations ************
const validateForm=[
  body('name').notEmpty().withMessage('El campo nombre no puede estar vacio'),
  body('price').notEmpty().withMessage('El campo precio no puede estar vacio'),
  body('description').notEmpty().withMessage('El campo descripcion no puede estar vacio'),
  body('image').custom((value,{req})=>{
    let file=req.file;
    if(!file){
      throw new Error('El campo imagen no puede estar vacio')
    }
    return true
  })
]
  

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
router.post('/', upload.single('image'), validateForm,productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:identificador/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit',productsController.edit); 
router.put('/:id', validateForm,productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
