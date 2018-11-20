//var express = require('express');
//var app = express();
var fs = require('fs');
var BinaryTree = require('binarytree');

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


var binaryTree;

// Read in file


fs.readFile('./source.xml', 'utf8', function(err, contents) {

				//console.dir(contents);

				// Traverse contents, building tree leaves at every if

		binaryTree = new BinaryTree({body: "", remainingInput: contents});
		console.log(binaryTree.root);
		traverse(binaryTree.root);

		let inorderTransversal = binaryTree.BFS();
		console.log(inorderTransversal);
});

function traverse(node){
	console.log(node.data.remainingInput);
	console.log(node.data.remainingInput.length);

  var runningBodyLeft = "";
	var runningBodyRight = "";

	var searchingSplitTagClose = false;
	var splittingNow = false;

	for (var i = 0, len = node.data.remainingInput.length; i < len; i++) {
		var c = node.data.remainingInput[i];
		// If it's an if, append it's content to the left, and the rest without it's content to the right

		if(searchingSplitTagClose){
			if(c == ">"){
				// Stop splitting
				searchingSplitTagClose = false;
				splittingNow = true;
				continue;
			}else{
				// Keep searching for closing tag
				continue;
			}
		}



		switch(c){
			case "<":
				if(node.data.remainingInput[i + 1] == "/"){
					console.log("Closing tag");
					// Closing if?
					if(node.data.remainingInput[i + 2] == "i" && node.data.remainingInput[i + 3] == "f"){
						nowSplitting = false;
						// Skip ahead 4 characters
						console.log(runningBodyLeft);
						console.log(runningBodyRight);
						i = i + 5;

						// Append to BinaryTree
						var remainingInput = node.data.remainingInput.substring(i, node.data.remainingInput.length);
						console.log(remainingInput);

						var leftNode = node.insertLeft({body: runningBodyLeft, remainingInput});
						var rightNode = node.insertRight({body: runningBodyRight, remainingInput});


					}


					// Proceed to next >

				}else{
					console.log("Opening tag");
					if(node.data.remainingInput[i + 1] == "i" && node.data.remainingInput[i + 2] == "f"){
						console.log("Opening if");
						// Skip ahead 3 characters
						// Split remaining input later.
						i = i + 4;
						searchingSplitTagClose = true;
					}
				}

			break;
			default:
				console.log(c);

				// Ignore escaped characters

				if(c == "\n"){
					c = " ";
				}

				if(!splittingNow){
					runningBodyRight += c;
				}
				runningBodyLeft += c;
			break;
		}
	}
}
