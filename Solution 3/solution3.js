var fs = require('fs'),
    readline = require('readline');
var count = 0;
var password = [];
var debug = true;
var file = '';
var checkMovement = false;

if(debug)
{
	file = 'test.txt';
}else
{
	file = 'triangles.txt';
}
console.log('This is the file used : ' + file);



var rd = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
});

function cutString(line)
{
	var stringArray = line.split(' ');


};

function () 
{

}

function checkTraingle(side1, side2, side3)
{
	if(side1 + side2 > side3)
	{
		return true
	}
	return false;
};

rd.on('line', function(line) {
  	cutString(line);
});