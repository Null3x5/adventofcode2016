var fs = require('fs'),
    readline = require('readline');
var count = 0;
var password = [];
var debug = false;
var file = '';
var checkMovement = false;

if(debug)
{
	file = 'test.txt';
}else
{
	file = 'problem2.txt';
}
console.log('this is the file used : ' + file);

function addToPassword(number){
	password.push(number);
};

function lineToArray(line, callback)
{
	var lineArray = line.split("");
	callback(lineArray);
};

function followTheString(lineArray)
{
	var currentPosition = grabStartingPosition();
	for(i in lineArray)
	{
		if(checkMovement)
		{
		console.log('current position : ' + currentPosition);
		console.log('current command : ' + lineArray[i]);
		currentPosition = movePosition(currentPosition, lineArray[i]);
		console.log('Position moved too : ' + currentPosition);
		}else
		{
		currentPosition = movePosition(currentPosition, lineArray[i]);
		}
	}	
	addToPassword(currentPosition);
};

function grabStartingPosition()
{
	if(password.length == 0)
	{
		return 5;
	}
	return password[password.length - 1];
};

var rd = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
  	followTheString(line);
});

rd.on('close', function() {
	var passwordTemp = '';
	for(i in password)
	{
		passwordTemp = passwordTemp + password[i];
	}

	console.log('Here is your password : ' + passwordTemp);
});

//I never want to look at this method ever again :(
function movePosition(position, command)
{
	//	Key pad
	//		1 2 3
	//		4 5 6
	//		7 8 9
	
	if(position == 1)
	{
		if(command == 'U'){return 1}
		if(command == 'D'){return 4}
		if(command == 'L'){return 1}
		if(command == 'R'){return 2}
	}
	if(position == 2)
	{
		if(command == 'U'){return 2}
		if(command == 'D'){return 5}
		if(command == 'L'){return 1}
		if(command == 'R'){return 3}	
	}
	if(position == 3)
	{
		if(command == 'U'){return 3}
		if(command == 'D'){return 6}
		if(command == 'L'){return 2}
		if(command == 'R'){return 3}
	}
	if(position == 4)
	{
		if(command == 'U'){return 1}
		if(command == 'D'){return 7}
		if(command == 'L'){return 4}
		if(command == 'R'){return 5}
	}
	if(position == 5)
	{
		if(command == 'U'){return 2}
		if(command == 'D'){return 8}
		if(command == 'L'){return 4}
		if(command == 'R'){return 6}
	}
	if(position == 6)
	{
		if(command == 'U'){return 3}
		if(command == 'D'){return 9}
		if(command == 'L'){return 5}
		if(command == 'R'){return 6}
	}
	if(position == 7)
	{
		if(command == 'U'){return 4}
		if(command == 'D'){return 7}
		if(command == 'L'){return 7}
		if(command == 'R'){return 8}
	}
	if(position == 8)
	{
		if(command == 'U'){return 5}
		if(command == 'D'){return 8}
		if(command == 'L'){return 7}
		if(command == 'R'){return 9}
	}
	if(position == 9)
	{
		if(command == 'U'){return 6}
		if(command == 'D'){return 9}
		if(command == 'L'){return 8}
		if(command == 'R'){return 9}
	}
	
	//	Key pad
	//		1 2 3
	//		4 5 6
	//		7 8 9
};