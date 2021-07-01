const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const read=require('../data/productdb')
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
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;