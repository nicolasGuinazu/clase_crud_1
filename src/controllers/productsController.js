
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {read,erase}=require('../data/productsDb')
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
		res.send('FUI POR POST!')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id = req.params.id;
		const product = products.find((prod) => prod.id == id);

		res.render('product-edit-form',{product})
	},
	// Update - Method to update
	update: (req, res) => {
		res.send('FUI POR PUT!')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let idDelete=req.params.id
		erase(idDelete)
	}
};

module.exports = controller;