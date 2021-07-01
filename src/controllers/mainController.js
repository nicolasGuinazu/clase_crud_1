const {read}=require('../data/productsDb')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const products=read()

const controller = {
	index: (req, res) => {
		const visitedProducts = products.filter((product) => product.category == 'visited');
		const inSaleProducts = products.filter((product) => product.category == 'in-sale');

		const viewData = {
			visiteds: visitedProducts,
			inSale: inSaleProducts
		}

		res.render('index', viewData)
	},
	search: (req, res) => {
	 	let search=req.query.keywords
		const searched = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));

		res.render('results',{searched}) 
	},
	admin: (req, res) => {

	   res.render('admin-panel') 
   },
	
};

module.exports = controller;
