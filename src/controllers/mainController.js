const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		return res.render('index', {
			visitedProducts : products.filter( product => product.category === 'visited'),
			saleProducts : products.filter( product => product.category === 'in-sale'),
			toThousand
		})
	},
	search: (req, res) => {
		
		const searchResult = products.filter( product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()));
		
		return res.render('results', {
			searchResult, 
			toThousand,
			keywords : req.query.keywords
		})
	},
};

module.exports = controller;
