require('dotenv').config()

const PORT = process.env.PORT
const MONGODBURL = process.env.MONGODB_URI

module.exports = {
    MONGODBURL, 
    PORT
}