var db = require('../config/connection');
var collection = require('../config/collections');
const { ObjectId } = require('mongodb');

module.exports ={
    getAllCategories: () => {
        return new Promise (async (resolve,reject) => {
            let categories = await db.get().collection(collection.CATEGORY_COLLECTION).find().toArray();
            resolve(categories);
        })
    },
    getHighlights: () => {
        return new Promise (async (resolve,reject) =>{
            let highlights = await db.get().collection(collection.HIGHLIGHT_COLLECTION).find().toArray();
            resolve(highlights);
        })
    },
    getTopDeals: () => {
        return new Promise (async (resolve,reject) => {
            let 
        })
    }
}