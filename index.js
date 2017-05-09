
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/anaBot', function(req, res) {
    var userAnswer = req.body.result && req.body.result.parameters && 
                 req.body.result.parameters.userAnswer ? 
                 req.body.result.parameters.userAnswer : "Seems like some problem. Speak again."
    


var text = "Thanks for your response!";


 return res.json({
        speech: text,
        displayText: text,
        source: 'ana-web-hook'
        
    });

});
    
    
app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});