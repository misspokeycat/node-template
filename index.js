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
    
    //hello?name=raul
    app.get("/hello", function(req, res){
        var name = req.query.name;
        if (name == undefined){
            name = 'world';
        }
        res.send("Hello " + name + "!");
    });
    
    var contactSchema = mongoose.Schema({
        fname: String,
        lname: String,
        email: String
    });
    
    var Contact = mongoose.model("Contact", contactSchema);
    
    app.post("/submit", function(req, res){
        var data = req.body;
        console.log(req.body);
        var newContact = new Contact(data);
        newContact.save(function(err){
           if (!err){
               res.send("Data submitted sucessfully!");
           } else {
               console.error(err);
               res.send("We got an err:" + err);
           }
        });
    });
    
    app.get("/contacts", function(req, res){
       var firstname = req.query.fname;
       Contact.find({fname : firstname}, function(err, contacts){
            if (err) console.log("Something broke!");
            console.log(contacts[0]);
            res.send(contacts[0]); 
       });
    });
    
    app.listen(process.env.PORT, '0.0.0.0', function(err){
        if (err){
            console.error(err);
        }
       console.log("Server running on port " + process.env.PORT); 
    });
});

