
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var firebase = require('firebase-admin');

var serviceAccount = require("./service-account.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://high-school-ana.firebaseio.com/"
});


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/anabot', function(req, res) {
    var userAnswer = req.body.result && req.body.result.parameters && 
                 req.body.result.parameters.userAnswer ? 
                 req.body.result.parameters.userAnswer : "Seems like some problem. Speak again."
    
 var userName = req.body.result.contexts[0] && req.body.result.contexts[0].parameters && 
                 req.body.result.contexts[0].parameters.userName ? 
                 req.body.result.contexts[0].parameters.userName : "Seems like some problem."
    
    
    

var text = "Thanks for your response!";


 return res.json({
        speech: userAnswer,
        displayText: userAnswer,
        source: 'ana-web-hook'
        
    });

});
    
    
app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});