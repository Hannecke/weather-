
var EventEmitter = require("events").EventEmitter;
var http = require("http");
var util = require("util");

function Profile(username) {

    EventEmitter.call(this);

    profileEmitter = this;

    //Connect to the API URL 
    var request = http.get("http://api.openweathermap.org/data/2.5/weather?q=" + username + "={0bd8a796808e810c194ef49e822e726d}", function(response) {
        var body = "";

        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
            
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    //Parse the data
                    var profile = JSON.parse(body);         
                    profileEmitter.emit("end", profile);
                } catch (error) {
                    profileEmitter.emit("error", error);
                }
            }
        });
        response.on("error", function(error){
            profileEmitter.emit("error", error);
        });
    });
}

util.inherits( Profile, EventEmitter );

module.exports = Profile;
