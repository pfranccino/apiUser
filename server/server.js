require('./config/config');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario.js'))

mongoose.connect(process.env.NODE_ENV, (err, resp) => {

    if (err) throw err;

    console.log('Base de datos conectada')

});

let port = process.env.PORT;





app.listen(port, () => {
    console.log('Escuchando Puerto', port);
});