
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

var ref = firebase.database().ref('Ana');


var messagesRef = ref.child('Oviedo');

var nameRef;

var previousQuestion;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/anabot', function(req, res) {

    if(req.body.result.parameters.method == "name")
    {
        var userName = req.body.result && req.body.result.parameters && 
            req.body.result.parameters.userName ? 
            req.body.result.parameters.userName : "Seems like some problem."
        
        nameRef = messagesRef.child(userName);
        
        nameRef.push({
            Question: "What's your name?",
            Name: userName
        }); 

        var response = "Thank you!, I just have 1 question \\nHello " + userName + " on a scale of 1 - 10 how likely are you to recommend <School>?";

        previousQuestion = response;

        return res.json({
            speech: response,
            displayresponse: response,
            source: 'ana-web-hook'
        });
    }


    else if (req.body.result.parameters.method == "Rating")
    {
        var userAnswer = req.body.result && req.body.result.parameters &&   
            req.body.result.parameters.userAnswer ? 
            req.body.result.parameters.userAnswer : "Seems like some problem. Speak again."
         
         nameRef.push({
            Question: previousQuestion,
            Rating: userAnswer
         });


        var response = "What do you like about <School>?";
        previousQuestion = response;

        return res.json({
            speech: response,
            displayresponse: response,
            source: 'ana-web-hook'
        });
    }

    else if (req.body.result.parameters.method == "What They Like")
    {
        var userLikes = req.body.result && req.body.result.parameters &&   
            req.body.result.parameters.userLikes ? 
            req.body.result.parameters.userLikes : "Seems like some problem. Speak again."
         
         nameRef.push({
            Question: previousQuestion,
            Liked: userLikes
         });

        var response = "What could <School> do better?";
        previousQuestion = response;

        return res.json({
            speech: response,
            displayresponse: response,
            source: 'ana-web-hook'
        });
    }

    else if (req.body.result.parameters.method == "What They Dont Like")
    {
        var userDislikes = req.body.result && req.body.result.parameters &&   
            req.body.result.parameters.userDislikes ? 
            req.body.result.parameters.userDislikes : "Seems like some problem. Speak again."
         
         nameRef.push({
            Question: previousQuestion,
            Disliked: userDislikes
         });

        var response = "Thank you again for your input";


        return res.json({
            speech: response,
            displayresponse: response,
            source: 'ana-web-hook'
        });
    }

    else
    {
        var response = "Else statement";

        return res.json({
            speech: response,
            displayresponse: response,
            source: 'ana-web-hook'
        });
    }

   
});
    
    
app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});