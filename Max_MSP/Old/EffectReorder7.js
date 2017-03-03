// number of effects available
numEffects = 6

// inlets and outlets
inlets = 1;
outlets = numEffects + 1;

// Runs when the js object receives a list of numbers
// The numbers correspond to the order of the audio effects
function list(routes)
{
	//Initialize all outputs to -1
	for (var i = 0; i < outlets; i++) {
		outlet(i, -1);
	}
	
	//Route audio effects according to the input list
	outlet(0, arguments[0]);
	for (var i = 0; i<arguments.length; i++) {
		outlet(arguments[i], arguments[i+1]);
	}	
	outlet(arguments[arguments.length-1], numEffects + 1);
}