//load env variables
require('dotenv').config();

module.exports = {
  database: process.env.DB_URI,
  secret: process.env.DB_SECRET
}