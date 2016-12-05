var crypto = require('crypto');
var test = 'abc';
var actual = 'cxdnnyjw';
var dataString = '';
var debug = false;
var password = "********";
var substitute = "*";

if(debug)
{
	console.log('this is a test');
	dataString = test;
}else
{
	console.log('this is not a test : ');
	dataString = actual;
}

var counter = 0;
var lengthOfDataString = dataString.lenth;
var foundIt = true;
var passwordLenth = 0;
while(foundIt)
{
	var hashedString = crypto.createHash('md5').update(dataString+counter).digest("hex").split('');
	if(doesItHaveThe5Zeros(hashedString))
	{
		var numberArray = counter.toString().split('');
		console.log('The string in question : ' + hashedString);
		insertIntoThePassword(hashedString);
		console.log('password so far : ' + password);
	}
	counter++;
	if(isPasswordComplete()){break;}
}

function insertIntoThePassword(hashedString)
{
	var position = parseInt(hashedString[5]);
	var value = hashedString[6];
	var tempPassword = password.split('');
	if(debug)
	{
	console.log('This is the temp : ' + tempPassword);
	console.log('This is the temp[] : ' + tempPassword[position]);
	console.log('This is the Value : '+ value + ' this is the postiong : ' + position);
	console.log('This is the true or false' + substitute === (tempPassword[position ]));
	}

	if( position != NaN && substitute === (tempPassword[position]) )
	{
		console.log('this has been saved ------');
		tempPassword[position] = value;
		rebuildPassword(tempPassword);
	}
};

function isPasswordComplete(tempArray)
{
	var tempPassword = password.split('');
	for(i in tempPassword)
	{
		if(tempPassword[i] === substitute)
		{
			return false;
		}
	}
	return true;
};

function rebuildPassword(tempArray)
{
	var tempHolder = '';
	for(i in tempArray)
	{
		tempHolder = tempHolder + tempArray[i];
	}
	password = tempHolder;
};

console.log('This is the password : ' + password);

function doesItHaveThe5Zeros(hashedArray)
{

	var counter = 0;
	for(var i = 0; i < 5; i++)
	{
		if(hashedArray[i] == 0)
		{
			counter++;
		}
	}

	if(counter == 5)
	{
		return true;
	}else
	{
		return false;
	}

};