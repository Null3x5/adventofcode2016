var fs = require('fs'),
    readline = require('readline');
var count = 0;
var counter = 0;
var password = [];
var debugValidation = false;
var debug = false;
var file = '';

if(debug)
{
	file = 'test.txt';
}else
{
	file = 'triangles.txt';
}

console.log('This is the file used : ' + file);

function get3valuesfromThisText(input)
{
	var numbers = [];
	for(i in input)
	{
		if(input[i] != null && input[i] != '')
		{
			numbers.push(input[i].trim());
		}
	}
	return numbers;
}


var rd = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
});

function cutString(line)
{
	var stringArray = get3valuesfromThisText(line.split(' '));
	checkAllSides(parseInt(stringArray[0]), parseInt(stringArray[1]), parseInt(stringArray[2]));
};

function checkAllSides(side1,side2,side3) 
{
	if( checkTraingle(side1, side2, side3) && checkTraingle(side2, side3, side1) &&	checkTraingle(side3, side1, side2) )
	{
		count++;
	}
	if(debugValidation && counter % 10 == 0)
	{
		sleep(1000);
	}
	counter++;
};

function checkTraingle(side1, side2, side3)
{
	var value = side1 + side2;
	if( value <= side3)
	{
		return false;
	}
	return true;
};

rd.on('line', function(line) {
  	cutString(line);
});

//after the lines are read.........
rd.on('close', function() {
	console.log('------------------------------------------------------- Triangle Count :' + count);
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}