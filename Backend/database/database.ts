const monk = require('monk')
require('dotenv').config();

const db = monk(process.env.MONGO_URI)

const urls = db.get('urls');
db.then(() => {
    console.log(`Connected To Server`)
})
urls.createIndex('slug')

module.exports = urls 