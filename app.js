const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
const path = require('path');

const mongoose = require('mongoose');
const routes = require('./routes/bookRoutes');
const expressValidator = require('express-validator');
mongoose.Promise = global.Promise;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

mongoose.connect('mongodb://localhost:27017/bookStore', {
    useNewUrlParser: true
}).then(() => {
    console.log("Database connected successfully... ");
}).catch(err => {
    console.log('Failed to connect DataBase...');
    process.exit();
});

app.use('/', routes);

module.exports = app;

