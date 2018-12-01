var builtInterface = 0;

function buildModelsInterface() {
    emptyInterface();
    let body = $('body');
    //Possibly have a carousel here with airplane models. For now, drop-down menu.
    body.append('<h1>Select an airplane model:</h1>');
    //This section should dynamically generate choices based on the airplane models that are in the database. For now, static options.
    body.append('<select><option id="modA" value="ModelA">Model A</option><option id="modB" value="ModelB">Model B</option><option id="modC" value="ModelC">Model C</option><option value="ModelD">Model D</option></select><br><br>');
    body.append('<button onclick="buildDestinationsInterface()">Destinations</button>');
    body.append('<button onclick="buildMileageInterface()">Mileage</button>');
	body.append('<button onclick="buildPassengersInterface()">Passengers</button>');
	buildReviewInterface();
	//User selects a model from the dynamically generated dropdown list. Get the name of the model from the user's selection. Set planeName = name of model selected by user.
	let planeName = "Model A";
	//let planeName = document.getElementById("modA").value; //Change this to get plane name based on selection from dynamically created menu
    body.append('<h1>Videos</h1>');
    body.append('<button onclick="displayVideos('+planeName+')">View top videos of this plane</button>');
};

function emptyInterface() {
    let body = $('body');
    body.empty();
    body.append('<button onclick="buildHomeInterface()">Home</button><br>');
};

function buildReviewInterface() {
	let body = $('body');
	body.append('<h1>Reviews</h1>');
	body.append('<p>Display average stars out of five and a count of total reviews here</p>');
	body.append('<p>Display excerpts from reviews here</p>');
    body.append('<h2>Enter a new review of X model<h2><textarea id="newReview" name="textarea" style="width:250px;height:150px;"></textarea>');
	body.append('<button onclick="submitNewReview()">Submit Review</button>');
}

function buildDestinationsInterface() {
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    let body = $('body');
    body.append('<h1 class="interface">Destinations interface here</h1>');
    builtInterface=1;
	//Show states/airports that model has flown in and out of + reviews for model
	
	body.append('<h2 class="interface">Countries</h2>');
	body.append('<p class="interface">Display countries here</p>');
	
	body.append('<h2 class="interface">Airports</h2>');
	body.append('<p class="interface">Display airports here</p>');
};

function buildMileageInterface() {
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    let body = $('body');
    body.append('<h1 class="interface">Mileage interface here</h1>');
    builtInterface=1;
	//Show airplane model mileage
	body.append('<h2 class="interface">Display number of miles traveled by this model here</h2>');

};

function buildPassengersInterface() {
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    let body = $('body');
    body.append('<h1 class="interface">Passengers interface here</h1>');
    builtInterface=1;
	//Show reviews from passengers on airplane model?
	body.append('<h2 class="interface">Display number of passengers that have rode on this model here</h2>');
};

function buildHomeInterface() {
    let body = $('body');
    body.empty();
    body.append('<button class="button" onclick="buildModelsInterface()">Models</button>');
    body.append('<button class="button" onclick="buildMapInterface()">Map</button>');
};


function submitNewReview() {
	let obj = 0; //What should this be?
    let review = document.getElementById("newReview").value;
	console.log(review);
	Reviews.Add(obj, review);
};

function displayVideos(planeName) {
	let url = YouTube.GetTopVideoForPlane(planeName);
    let body = $('body');
	body.append('<br><br><iframe class="interface" width="420" height="345" src='+url+'></iframe>');
};
