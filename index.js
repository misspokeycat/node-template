var express = require('express');
var app = express();

app.use(express.static('public'));

//hello?name=raul
app.get("/hello", function(req, res){
    var name = req.query.name;
    if (name == undefined){
        name = 'world';
    }
    res.send("Hello " + name + "!");
});

app.listen(process.env.PORT, '0.0.0.0', function(err){
    if (err){
        console.error(err);
    }
   console.log("Server running on port " + process.env.PORT); 
});