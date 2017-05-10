
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
            Name: userName
        }); 

        var text = "Thank you " + userName + " for your response!";

        return res.json({
            speech: text,
            displayText: text,
            source: 'ana-web-hook'
        });
    }


    else if (req.body.result.parameters.method == "Rating")
    {
        var userAnswer = req.body.result && req.body.result.parameters &&   
            req.body.result.parameters.userAnswer ? 
            req.body.result.parameters.userAnswer : "Seems like some problem. Speak again."
         
         nameRef.push({
            Rating: userAnswer
         });


        var text = "Rating Recieved!";


        return res.json({
            speech: text,
            displayText: text,
            source: 'ana-web-hook'
        });
    }

    else if (req.body.result.parameters.method == "What They Like")
    {
        var userLikes = req.body.result && req.body.result.parameters &&   
            req.body.result.parameters.userLikes ? 
            req.body.result.parameters.userLikes : "Seems like some problem. Speak again."
         
         nameRef.push({
            Liked: userLikes
         });

        var text = "What they liked Recieved!";

        return res.json({
            speech: text,
            displayText: text,
            source: 'ana-web-hook'
        });
    }

    else if (req.body.result.parameters.method == "What They Dont like")
    {
        var userDislikes = req.body.result && req.body.result.parameters &&   
            req.body.result.parameters.userDislikes ? 
            req.body.result.parameters.userDislikes : "Seems like some problem. Speak again."
         
         nameRef.push({
            Disliked: userDislikes
         });

        var text = "What they Disliked Recieved!";

        return res.json({
            speech: text,
            displayText: text,
            source: 'ana-web-hook'
        });
    }

    else
    {
        var text = "Else statement";

        return res.json({
            speech: text,
            displayText: text,
            source: 'ana-web-hook'
        });
    }

    
    // var userAnswer = req.body.result && req.body.result.parameters && 
    //              req.body.result.parameters.userAnswer ? 
    //              req.body.result.parameters.userAnswer : "Seems like some problem. Speak again."
    
    // var userName = req.body.result.contexts[0] && req.body.result.contexts[0].parameters && 
    //              req.body.result.contexts[0].parameters.userName ? 
    //              req.body.result.contexts[0].parameters.userName : "Seems like some problem."
    
    
    // nameRef.push({
    //         Response: userAnswer
    //     });


    // var text = "Thank you for your response!";


    // return res.json({
    //     speech: text,
    //     displayText: text,
    //     source: 'ana-web-hook'
        
    // });

});
    
    
app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});