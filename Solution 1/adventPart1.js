//advent1
var inputString = 'R3, R1, R4, L4, R3, R1, R1, L3, L5, L5, L3, R1, R4, L2, L1, R3, L3, R2, R1, R1, L5, L2, L1, R2, L4, R1, L2, L4, R2, R2, L2, L4, L3, R1, R4, R3, L1, R1, L5, R4, L2, R185, L2, R4, R49, L3, L4, R5, R1, R1, L1, L1, R2, L1, L4, R4, R5, R4, L3, L5, R1, R71, L1, R1, R186, L5, L2, R5, R4, R1, L5, L2, R3, R2, R5, R5, R4, R1, R4, R2, L1, R4, L1, L4, L5, L4, R4, R5, R1, L2, L4, L1, L5, L3, L5, R2, L5, R4, L4, R3, R3, R1, R4, L1, L2, R2, L1, R4, R2, R2, R5, R2, R5, L1, R1, L4, R5, R4, R2, R4, L5, R3, R2, R5, R3, L3, L5, L4, L3, L2, L2, R3, R2, L1, L1, L5, R1, L3, R3, R4, R5, L3, L5, R1, L3, L5, L5, L2, R1, L3, L1, L3, R4, L1, R3, L2, L2, R3, R3, R4, R4, R1, L4, R1, L5';
var facing = 'N';
var x = 0;
var y = 0;
var actual_x = 0;
var actual_y = 0;
var lines = [];
var intersections = [];
var testNumber = 'R2, L3';
var testNumber2 = 'R2, R2, R2';
var testNumber3 = 'R5, L5, R5, R3';

var testNumber4 = 'R8, R4, R4, R8';


parseString(inputString,starting);

function HowManyBlocksAway()
{
	var blocksaway= Math.abs(x) + Math.abs(y);
	console.log('Blocks Away :' + blocksaway);
	WestorEast();
	NorthorSouth();

	console.log(intersections[0]);

};

//Displays the dirrection with North or South.
function NorthorSouth()
{
	if(y == 0){
		console.log("nothing in the y")
	}else{
		//only hit if x is not zero.
		if(y > 0){
			console.log('North :' + y);
		}else{
			console.log('South :' + y);
		}
	}
};

//Displays the dirrection with West or East.
function WestorEast()
{
	if(x == 0){
		console.log("nothing in the x")
	}else{
		//only hit if x is not zero.
		if(x > 0){
			console.log('East :' + x);
		}else{
			console.log('West :' + x);
		}
	}
};

//parse the string and make it into an array
function parseString(directionString, callback){
	var directionArray = directionString.split(', ');
	callback(directionArray);
};


function sliceTheString(inputString, callback){
	var direction = inputString.slice(0,1);
	var blocks = parseInt(inputString.slice(1, (inputString.length)));
	
	callback(direction, blocks);

};

//want to use this to start the program
function starting(directionArray)
{
	for (i in directionArray)
	{
		console.log('direction ' + directionArray[i]);
		sliceTheString(directionArray[i], whichWayDoIGooo);
	}

	HowManyBlocksAway();
	
};

function whichWayDoIGooo(direction, blocks)
{
	if(facing == 'W' || facing == 'E')
	{
		changingY(direction, blocks);
	}else
	{
		changingX(direction, blocks);
	}
};

function changingY(direction, blocks)
{
	if(facing == 'W')
	{	
		if(direction == 'R')
		{
			//should only hit here if its West and Right
			currentLine = {starting:[x,y],ending:[x,y + blocks], direc:'V'};
			displayLinePlease(currentLine);
			facing = 'N';
			y = y + blocks;
		}else
		{
			//should only hit here if its West and Left	
			currentLine = {starting:[x,y],ending:[x,y - blocks], direc:'V'};
			displayLinePlease(currentLine);
			facing = 'S';
			y = y - blocks;
		}
	}else
	{		
		if(direction == 'R')
		{
			//should only hit here if its East and Right
			currentLine = {starting:[x,y],ending:[x,y - blocks], direc:'V'};
			displayLinePlease(currentLine);
			facing = 'S';
			y = y - blocks;
		}else
		{
			//should only hit here if its East and Left
			currentLine = {starting:[x,y],ending:[x,y + blocks],direc:'V'};
			displayLinePlease(currentLine);
			facing = 'N';
			y = y + blocks;
		}
	}
};

function changingX(direction, blocks)
{
	if(facing == 'N')
	{	
		if(direction == 'R')
		{
			//should only hit here if its North and Right
			currentLine = {starting:[x,y],ending:[x+blocks,y],direc:'H'};
			displayLinePlease(currentLine);
			facing = 'E';
			x = x + blocks;
		}else
		{
			//should only hit here if its North and Left
			currentLine = {starting:[x,y],ending:[x-blocks,y],direc:'H'};
			displayLinePlease(currentLine);
			facing = 'W';
			x = x - blocks;
		}
	}else
	{
		if(direction == 'R')
		{
			//should only hit here if its South and Right
			currentLine = {starting:[x,y],ending:[x-blocks,y],direc:'H'};
			displayLinePlease(currentLine);
			facing = 'W';
			x = x - blocks;
		}else
		{
			//should only hit here if its South and Left
			currentLine = {starting:[x,y],ending:[x+blocks,y],direc:'H'};
			displayLinePlease(currentLine);
			facing = 'E';
			x = x + blocks;
		}
	}
};

function displayLinePlease(line)
{

	checkCrossing(line);
	addLine(line);
};

function displayLineInfo(line)
{
	console.log('starting : ('+line.starting[0]+','+line.starting[1]+')');
	console.log('ending : ('+line.ending[0]+','+line.ending[1]+')');
	console.log('orientation : ' + line.direc)
};

function addLine(line)
{
	lines.push(line);
};

function compareTheLines(line1, line2)
{
	if(line1.direc == 'H')
	{
		if(crossingChecker(line1.starting[0], line1.ending[0],line2.starting[0]))
		{
			if(crossingChecker(line2.starting[1], line2.ending[1],line1.starting[1]))
			{
				return true;
			}
		}
	}else
	{
		if(crossingChecker(line1.starting[1], line1.ending[1],line2.starting[1]))
		{
			if(crossingChecker(line2.starting[0], line2.ending[0],line1.starting[0]))
			{
				return true;
			}
		}
	}
	return false;
};

function checkCrossing(line)
{
	for (i in lines)
	{
		if(line.direc == 'H')
		{
			if(lines[i].direc == 'V')
			{
				if(compareTheLines(line,lines[i]))
				{
					foundLocation(line,lines[i],'H');
					console.log('intersecteddddddddddddddddddddddddddddddd');
					displayLineInfo(line);
					displayLineInfo(lines[i]);
				}
			}
		}else
		{
			if(lines[i].direc == 'H')
			{
				if(compareTheLines(line,lines[i]))
				{
					foundLocation(line,lines[i],'V');
					console.log('intersecteddddddddddddddddddddddddddddddd');
					displayLineInfo(line);
					displayLineInfo(lines[i]);
				}
			}
		}
		
	}
};

function foundLocation(line1,line2,lineOrientation)
{
	if(lineOrientation == 'H')
	{
		var x = line2.starting[0];
		var y = line1.starting[1];
		var point = {x,y};
		intersections.push(point);

	}else
	{
		var x = line1.starting[0];
		var y = line2.starting[1];
		var point = {x,y};
		intersections.push(point);
	}
};

function crossingChecker(end1, end2, middleValue){
	console.log('end1 : ' + end1);
	console.log('end2 : ' + end2);
	console.log('middle : ' + middleValue);
	if(end1 < middleValue && middleValue < end2)
	{
		return true;
	}

	if(end2 < middleValue && middleValue < end1)
	{
		return true;
	}
	
	return false;
};