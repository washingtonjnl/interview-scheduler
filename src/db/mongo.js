// import environment data
const dotenv = require('dotenv').config();

// import mongoose
const mongoose = require('mongoose');

// config database
const { DB_USER, DB_PASS} = process.env

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-diw7s.mongodb.net/test?retryWrites=true&w=majority`;

// connect database to backend scripts
function connectDB () {
  mongoose.connect(dbURL, dbOptions)
  .then(() => {
    console.log('Successful connection to Mongo!')
  })
  .catch((err) => {
    console.log(err);
  });
};

// export connect trigger
module.exports = connectDB;
