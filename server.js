//var express = require('express');
//var app = express();
var fs = require('fs');
var parseString = require('xml2js').parseString;

//app.use("/public", express.static(__dirname + "/UI/dist"));

// app.get("/api/v1/intro", function (req, res) {
// 	res.send('Intro');
// });
//
// app.get("/*", function (req, res) {
// 	response = {
// 		"status": "404",
// 		"message": "Access the translation permutator API at /api/v1/intro or the webapp at /static/src/index.html"
// 	}
// 	res.json(response);
// });

// app.listen(3000, function () {
// 	console.log('Listening on port 3000.');
// });


// Read in file

var sourceFile =

fs.readFile('./source.xml', 'utf8', function(err, contents) {

		var xml = "<root>\n" + contents + "</root>";
		console.log(xml);
		parseString(xml, {ignoreAttrs: true}, function (err, result) {
				if(err){
						console.log(err);
				}else{
						console.dir(result);
				}
		});
});
