require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
var mongoose = require("mongoose");

const app = express();
// Log requests to the console.
app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(__dirname + process.env.LOG_PATH + 'backoffice.log', { flags: 'a' })
app.use(logger('combined', { "stream": accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);

let corsOptions = {
    origin: '*'
};

if (process.env.ACTIVATE_CORS === 'true') {
    let whitelist = ['http://localhost:4200'];

    corsOptions = {
        origin: function(origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    };
}

app.use(cors(corsOptions));


let url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@cluster0.jgzds.mongodb.net/" + process.env.DB + "?retryWrites=true&w=majority";
//let url = "mongodb+srv://djibba:djibba@cluster0.jgzds.mongodb.net/hello_node?retryWrites=true&w=majority";

//console.log(url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established succesfully");
});


//const mongoose = require('mongoose');

// const connect = mongoose.connect('mongodb://localhost/hello_node', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));

// module.exports = connect;

require('./routes')(app);

app.get('*', (req, res) =>
    res.status(200).send({
        message: 'Genealogy created by ouz... :( :)',
    })
);

module.exports = app;