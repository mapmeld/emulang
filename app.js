const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    compression = require('compression');

console.log('connecting to MongoDB');
var db_uri = process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'localhost';
mongoose.connect(db_uri);

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express['static'](__dirname + '/static'));
app.use(compression());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/start', (req, res) => {
  res.render('start', {
    name: req.query.name
  });
});

app.get('/api', (req, res) => {
  res.render('explainer');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('ready to go');
});
