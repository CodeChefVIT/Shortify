const monk = require('monk')
require('dotenv').config();

const db = monk('mongodb://localhost:27017/shortify')

const urls = db.get('urls');
db.then(() => {
    console.log(`Connected To Server`)
})
urls.createIndex('shortit')

module.exports = urls 