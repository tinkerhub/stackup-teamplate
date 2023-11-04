
const mongoClient = require('mongodb').MongoClient;
const state = {
    db: null
}
module.exports.connect = (done) => {
    const url = 'mongodb://127.0.0.1:27017/';
    const dbname = 'ecommerce';

    mongoClient.connect(url)
        .then(data => {
            state.db = data.db(dbname);
            done();
        })
        .catch(err => {
            done(err);
        });
}

module.exports.get = () => {
    return state.db;
}
