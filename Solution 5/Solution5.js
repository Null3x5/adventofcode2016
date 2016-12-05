var crypto = require('crypto');
var test = 'abc';
var actual = 'cxdnnyjw';
var dataString = '';
var debug = false;
var password = '';

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
		password = password + hashedString[5];
		passwordLenth++;

	}
	counter++;
	if(passwordLenth == 8){break;}
}

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