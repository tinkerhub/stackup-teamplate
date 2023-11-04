var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { resolve, reject } = require('promise');

module.exports = {

    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            const existingUser = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email });
    
            if (existingUser) {
                reject("Email already exists");
            } else {
                userData.Password = await bcrypt.hash(userData.Password, 10);
    
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                    resolve(data);
                });
            }
        });
    },
    
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email });
            if (user) {
                bcrypt.compare(userData.Password, user.Password).then((status) => {
                    if (status) {
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    }
                    else {
                        resolve({ status: false });
                    }
                })
            }
            else {
                resolve({ status: false });
            }
        })
    },
    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: new ObjectId(userId) })
            if (cart) {
                count = cart.products.length;
            }
            resolve(count)
        })
    } 
}