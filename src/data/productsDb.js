const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = {
    read: () => {
        return products
    },
    erase: (idDelete) => {
        let newArr = products.filter((products) => products.id != idDelete)
        let parsedArr = JSON.stringify(newArr);
        fs.writeFileSync(productsFilePath, parsedArr)
    },
    create: (newProduct) => {
        products.push(newProduct)
        let parsedProducts = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, parsedProducts)
    },
}


module.exports = db
