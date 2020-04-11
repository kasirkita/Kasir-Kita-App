const express = require('express');
const path = require('path');
const port = 3002;
const app = express();
const bodyParser = require('body-parser');
const preview = require('./app/preview')
const label = require('./app/label')
const receipt = require('./app/receipt')
const labelDiscount = require('./app/labelDiscount')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, './')));

app.route('/preview').post(preview.preview)
app.route('/label').post(label.label)
app.route('/receipt').post(receipt.receipt)
app.route('/label-discount').post(labelDiscount.labelDiscount)

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

app.listen(port, () => console.log(`Service is running at ${port}`));