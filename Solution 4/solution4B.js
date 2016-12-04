var fs = require('fs'),
    readline = require('readline');
var count = 0;
var counter = 0;
var keyWords = ['storage', 'stolen', 'north', 'Norht', 'santa'];
var password = [];
var message = [];
var debugMapPart = false;
var debugValidation = false;
var debugCounter = false;
var debugLine = false;
var debugText = false;
var debugMap = false;
var debugChecker = false;
var file = '';

if(debugText)
{
	file = 'test.txt';
}else
{
	file = 'inputText.txt';
}

console.log('This is the file used : ' + file);

var rd = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
});

function cutString(line)
{
	var firstLineSplit = line.split('[');
	var checksum = firstLineSplit[0].split('-');
	var check = firstLineSplit[1].slice(0, (firstLineSplit[1].length - 1));
	var number = parseInt(checksum.pop());
	if(debugLine)
	{
		console.log('The check :' + check);
		console.log('The checksum : ' + checksum);
		console.log('the int : ' + number);
	}
	if(checker(checksum, check))
	{
		count = count + number;
		message.push(caesarShift(recreateString(checksum), number));
		if(debugCounter)
		{
			console.log('Debug the addition Part');
			console.log('The check :' + check);
			console.log('The checksum : ' + checksum);
			console.log('the int : ' + number);

		}
	}
};

function recreateString(array)
{
	var message = '';
	for(x in array)
	{
		message = message + ' ' + array[x];
	}
	return message;
};

function checker(checksum, check)
{
	var map = createMap(checksum);
	map.sort(function(a, b)
		{
			return  b.value - a.value;
		});

	if(debugMap)
	{
		console.log('Checker logs');
		console.log(map);
	}
	return theBeast(map, check, 5);
};

function theBeast(map, check, trigger5times){

	if(debugChecker){console.log('----------------------------------------------------------------------');}
	return recursivePart(map, check, trigger5times);

};

function recursivePart(map, check, count)
{
	if(debugChecker){console.log(map);}
	var hit = false;
	var key = map[0].key;
	var value = map[0].value;
	if(debugChecker){console.log('Key : ' + key + ' Value : ' + value);}
	map.splice(0,1);

	for(x in check)
	{
		if(debugChecker){console.log('Checking : ' + check[x]);}
		if(check[x] == key)
		{
			count--;
			hit = true;
			if(debugChecker){console.log('counters left : ' + count);}
			break;
		}
	}
	if(sameCount(key, value, map, count, hit))
	{
		return false;
	}
	if(count == 0)
	{
	 	return true;
	}
	if(map.length == 0)
	{
		return false;
	}
	return recursivePart(map, check, count);
};

function sameCount(key, value, map, count, hit)
{
	if(hit){return false;}


	var counter = 0;
	for(i in map)
	{
		if(map[i].value == value)
		{
			counter++;
		}
	}
	if((counter - count) >= 0){return false;}
	return true;
};

function createMap(checksum)
{
	if(debugMapPart){console.log('CreateMap logs ');}
	
	var map = [];
	for(x in checksum)
	{
		var splitchecksum = checksum[x].split('');
		for(y in splitchecksum)
		{
			if(debugMapPart){console.log(splitchecksum[y]);}
			map = updateMap(map, splitchecksum[y]);
		}
	}

	return map;
};

function updateMap(map, character)
{
	var hit = false;
	for(x in map)
	{
		if(map[x].key == character)
		{
			map[x].value = map[x].value + 1;
			hit = true;
		}
	}
	if(!hit)
	{
		map.push({
			key : character,
			value : 1
		});
	}
	return map;
};

rd.on('line', function(line) {
  	cutString(line);
});

//after the lines are read.........
rd.on('close', function() {
	console.log('--------------------------------- Total Sum : ' + count);
	//console.log(recreateString(message));
	containsKeyWord(message);
});

function containsKeyWord(array)
{
	for(x in array)
	{
		for(i in keyWords)
		{
			if(array[x].includes(keyWords[i]))
			{
				console.log(array[x]);
				break;
			}
		}
	}

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// code below borrowed from https://gist.github.com/EvanHahn/2587465

var caesarShift = function(str, amount) {

	// Wrap the amount
	if (amount < 0)
		return caesarShift(str, amount + 26);

	// Make an output variable
	var output = '';

	// Go through each character
	for (var i = 0; i < str.length; i ++) {

		// Get the character we'll be appending
		var c = str[i];

		// If it's a letter...
		if (c.match(/[a-z]/i)) {

			// Get its code
			var code = str.charCodeAt(i);

			// Uppercase letters
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

			// Lowercase letters
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);

		}

		// Append
		output += c;

	}

	// All done!
	return output + ' : ' + amount;

};