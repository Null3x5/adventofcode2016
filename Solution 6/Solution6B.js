var fs = require('fs'),
    readline = require('readline');
var santasMessage = '';
var mapMessage = [];
var debugLine = false;
var debugText = false;

var file = '';

if(debugText){
	file = 'test.txt';
}else{
	file = 'inputText.txt';
}

console.log('This is the file used : ' + file);

function cutString(line){
	var lineArray = line.split('');
	for(i in lineArray)
	{
		mapMessage = mapSantasMessage(mapMessage,i,lineArray[i]);
	}
};

function mapSantasMessage(map, position, character){
	var hit = false;
	for(x in map){
		if(map[x].key == character && map[x].position == position){
			map[x].value = map[x].value + 1;
			hit = true;
		}
	}
	if(!hit){
		map.push({
			key : character,
			position : position,
			value : 1
		});
	}
	return map;
};
function sortAndDisplayMessage(){
	mapMessage.sort(function(a, b)
	{
		if(a.position == b.position){
			return a.value - b.value;
		}
		return  a.position - b.position;
	});
	var counter = 0;

	for(i in mapMessage){
		if(mapMessage[i].position == counter){
			santasMessage = santasMessage + mapMessage[i].key;
			counter++;
		}
	}
	console.log(mapMessage);
	console.log('--------------------------------- done');
	console.log('Santas Message is : ' + santasMessage);
};

var rd = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
});


rd.on('line', function(line) {
  	cutString(line);
});

//after the lines are read.........
rd.on('close', function(){
	sortAndDisplayMessage();
});
