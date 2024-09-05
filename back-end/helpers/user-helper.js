const { Products } = require('../model/model');

module.exports = {
    randomItems: () => {
       return new Promise(async (resolve,reject) => {
        const products = await Products.find();

        arr = [];

        for (let i = 0; i < 4; i++) {
            product = products[Math.floor(Math.random() * products.length)];
            if (!arr.some(item => item === product))
                arr.push(product);
        }

        resolve(arr);
       })
    }
}