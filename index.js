var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); //if error, log it
db.once('open', function() {
    //code to run once connection established (function callback) goes here
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    //////////////////////
    //Begin MongoDB models
    //////////////////////
    
    ////////////////////
    //End MongoDB models
    ////////////////////
    
    //////////////////////
    //Begin Express routes
    //////////////////////
    
    ////////////////////
    //End Express routes
    ////////////////////
    app.listen(process.env.PORT, '0.0.0.0', function(err){
        if (err){
            console.error(err);
        }
       console.log("Server running on port " + process.env.PORT); 
    });
});

