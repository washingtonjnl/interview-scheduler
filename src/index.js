const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('../src/routes/routes');

// import database
const connectDB = require('./db/mongo');
connectDB();

// config application
app.use(cors());
app.use(bodyParser.json());

// import routes
app.use(routes);

// Turn on API
app.get('/status', (req, res) => {
  res.send("API is running!")
});

app.listen(3000, () => {
  console.log('🦄 Back-end started!')
});
