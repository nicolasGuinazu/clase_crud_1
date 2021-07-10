
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {read,erase,create,update}=require('../data/productsDb')
const {validationResult}=require('express-validator')

let products=read()
const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = req.params.identificador;
		const product = products.find((prod) => prod.id == id);
		console.log(product)
		const viewData = {
			product,
			titulo: 'Hola'
		}

		return res.render('detail', viewData)
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')

	},
	
	// Create -  Method to store
	store: (req, res) => {
		let loadedImage
		if(typeof req.file !== "undefined"){
			loadedImage=req.file.filename
		}else{
			loadedImage=''
		}
		let newProduct={
			id:Math.random(),
			name:req.body.name,
			price:req.body.price,
			discount:req.body.discount,
			category:req.body.category,
			description:req.body.description,
			image:loadedImage,
		}

		
		let errores=validationResult(req);
		if (!errores.isEmpty()){
			return (res.render('product-create-form',{
				errors:errores.mapped()}))
		}else{
			create(newProduct)
			res.redirect('products')
		} 
		
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id = req.params.id;
		const product = products.find((prod) => prod.id == id);

		res.render('product-edit-form',{product})
	},
	// Update - Method to update
	update: (req, res) => {
		let idUpdate=req.params.id
		let modifiedProduct={
			name:req.body.name,
			price:req.body.price,
			discount:req.body.discount,
			category:req.body.category,
			description:req.body.description,
		}
		const product = products.find((prod) => prod.id == idUpdate)
		let errores=validationResult(req);
		if (!errores.isEmpty()){
		
			return(res.render('product-edit-form',{product,
				errors:errores.mapped(),}))
		}
		update(idUpdate,modifiedProduct)
		res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let idDelete=req.params.id
		erase(idDelete)
		res.redirect('/')
	}
};

module.exports = controller;