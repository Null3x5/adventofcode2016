var fs = require('fs'),
    readline = require('readline');

var count = 0;
var counter = 0;

var array1 = [];
var array2 = [];
var array3 = [];

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
	//console.log(numbers);
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
	array1.push(stringArray[0]);
	array2.push(stringArray[1]);
	array3.push(stringArray[2]);

};

function startCheckingTriangleArrays(triangle){
	checkAllSides(parseInt(triangle[0]), parseInt(triangle[1]), parseInt(triangle[2]));
};

function checkAllSides(side1,side2,side3) 
{
	console.log('Triangle : ' + side1 + ' , ' + side2 + ' , ' + side3 );

	if( checkTraingle(side1, side2, side3) && checkTraingle(side2, side3, side1) &&	checkTraingle(side3, side1, side2) )
	{
		count++;
		console.log('-------------------------------------------------------  count :' + count);
	}
/*	if(counter % 10 == 0)
	{
		sleep(1000);
	}*/
	counter++;
	//console.log('Triangles counted : ' + counter);

};

function checkTraingle(side1, side2, side3)
{
	var value = side1 + side2;
	if( value <= side3)
	{
		//console.log('Not Triangle : ' + value + ' < ' + side3 );

		return false;
	}
	//console.log('Not Triangle : ' + side1 + ' + ' + side2 + ' > ' + side3 );
	//console.log(( (side1 + side2) > side3))
	return true;
};

function start(){
	
	rd.on('line', function(line) {
  		cutString(line);
	});


	//after the lines are read.........
	rd.on('close', function() {
		checkArray(array1);
		checkArray(array2);
		checkArray(array3);


		console.log('done?');	
	});

};

function checkArray(array){
	
	for(i = 0; i < array.length / 3 ; i++)
	{
		//console.log( (i*3) + ' : '+ ((i*3)+1) +' : '+ ((i*3)+2) );
		//console.log( (i*3) + ' : '+ ((i*3)+1) +' : '+ ((i*3)+2) );
		checkAllSides(parseInt(array[(i*3)]), parseInt(array[((i*3)+1)]), parseInt(array[((i*3)+2)]));
	}
	console.log('length of array : ' + array.length);
};

start();
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}