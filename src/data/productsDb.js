const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const convertJson=(arr)=>{
    let parsedArr = JSON.stringify(arr);
    fs.writeFileSync(productsFilePath, parsedArr)
}

const db = {

    read: () => {
        return products
    },
    erase: (idDelete) => {
        let newArr = products.filter((products) => products.id != idDelete)
        convertJson(newArr)
    },
    create: (newProduct) => {
        products.push(newProduct)
        convertJson(products)
    },
    update: (idUpdate,modifiedProduct) => {
        console.log(modifiedProduct)
        console.log(idUpdate)
        const pos=products.findIndex(el => el.id == idUpdate);
        products[pos]={
            id:products[pos].id,
            ...modifiedProduct,
            image:products[pos].image
        }
        convertJson(products)
    },
}


module.exports = db
