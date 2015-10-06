var fs = require('fs');

function valuesR(values, content){
	//Cycle over the keys
	for(var key in values){
		//replace all with the values from the values object
		content = content.replace(key, values[key]);
	}
	return content;
}

function view(templateName, values, response){
	
	var filecontents = fs.readFileSync("./" + templateName + ".html", {encoding:"utf8"}); // leo el archivo de forma Sync para que se vea antes que response.end (la respuesta termine)
		
		filecontents = valuesR(values, filecontents);
		response.write(filecontents);

	
}

module.exports.view = view;
