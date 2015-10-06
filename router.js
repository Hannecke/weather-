var Profile = require("./weather.js");
var views = require("./views.js");
var queryString = require("querystring");

var commonHeaders =  {'Content-Type': 'text/html'};
// HANDLE THE HTTP route GET /and POST i.e. Home
function home(request,response){
  //if url =="/" && GET

  if(request.url === '/'){
    if(request.method.toLowerCase() === "get"){ 
    
      response.writeHead(200, commonHeaders);
      views.view("index", {}, response);
      response.end();
    
    }else{ // al request el form usamos metodo get 
    
    //if url == "/" && POST
    //get post
    request.on("data", function(postBody){
       console.log(postBody.toString());
       var query = queryString.parse(postBody.toString()); 
       response.writeHead(303, {Location:"/" + query.cityName}); 
       response.end();
    //redirect to /:username
    });   
  }  
 }
}

function user(request, response){
 
  var username = request.url.replace("/", "");
  if(username.length > 0){
      response.writeHead(200, commonHeaders);
      //get JSON from weather API
      var weatherProfile = new Profile(username);
      
      weatherProfile.on("end", function(profileJSON){       
        var values = {
          temperature: (profileJSON.main.temp - 273.15).toFixed(2),
          sky: profileJSON.weather[0].main,
          name: profileJSON.name

        }
        //show profile
          //response.write(values.temperature+ " " + values.sky + ' '+ values.name);
          views.view("index",values, response);
          views.view("footer",values, response);      
          response.end('');

     }); 
      weatherProfile.on("error", function(error){
       //on "error"
        //show the error
      response.end('Error\n'); 
     
      }); 

  }
}




module.exports.home = home;
module.exports.user = user;
