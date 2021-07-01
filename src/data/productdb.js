const fs = require('fs');
const path = require('path');

const read=()=>{
        const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        return products
    }

module.exports=read
