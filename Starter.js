var builtInterface = 0;

async function buildModelsInterface() {
    emptyInterface();
    let body = $('body');
    body.append('<h1>Select an airplane model:</h1>');
    const models = await Backend.GetPlanes();
     $('body').append('<select id="dropDown"><option selected="true" disabled="true">Select a model</option></select><br><br>');

    for (const model of models) { //Why is this loop not running?!?!?!?
        let option = document.createElement("option");     
        option.text = model.name;
        option.value = model.name;
        document.getElementById("dropDown").options.add(option); //Add plane to drop-down menu
    }

    body.append('<button id="destinations" onclick="buildDestinationsInterface()">Destinations</button>');
    body.append('<button id="mileage" onclick="buildMileageInterface()">Mileage</button>');
    body.append('<button id="passengers" onclick="buildPassengersInterface()">Passengers</button>');
  
    $("#dropDown").change(function planeObject(){ //Every time user selects a different plane
        for (const model of models) { //Why is this loop not running?!?!?!?
            let selection = document.getElementById("dropDown");
            let selectionName = selection.options[selection.selectedIndex].value;
            if (model.name === selectionName) {
                console.log("success");
                buildReviewInterface(model); //Set up review interface for this plane
                displayVideos(model); //Display Youtube videos for this plane
            }
        }
    });
};

function emptyInterface() {
    let body = $('body');
    body.empty();
    body.append('<button onclick="buildHomeInterface()">Home</button><br>');
};

function buildReviewInterface(model) {
	let body = $('body');
    body.append('<div id="reviews"><h1>Reviews</h1>');
    body.append('<p>Display excerpts from reviews here</p>');
    body.append('<h2>Enter a new review of X model<h2><textarea id="newReview" name="textarea" style="width:250px;height:150px;"></textarea>');
    body.append('<button id="submitNewReview">Submit Review</button></div>');
    let submit = document.getElementById("submitNewReview");
    submit.addEventListener("click", function submitNewReview() {
         let review = document.getElementById("newReview").value;
         Reviews.Add(model, review);
         alert("Thanks for your input. Your review has been added.");
    }, false);
};

function buildDestinationsInterface() {
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    let body = $('body');
    body.append('<h1 class="interface">Destinations interface here</h1>');
    builtInterface=1;
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
	body.append('<h2 class="interface">Display number of miles traveled by this model here</h2>');
};

function buildPassengersInterface() {
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    let body = $('body');
    body.append('<h1 class="interface">Passengers interface here</h1>');
    builtInterface=1;
	body.append('<h2 class="interface">Display number of passengers that have rode on this model here</h2>');
};

function buildHomeInterface() {
    let body = $('body');
    body.empty();
    body.append('<button class="button" onclick="buildModelsInterface()">Models</button>');
    body.append('<button class="button" onclick="buildMapInterface()">Map</button>');
};

async function displayVideos(planeObj) {
    let url = await YouTube.GetTopVideoForPlane(planeObj);
    let body = $('body');
    body.append('<p>View videos here<p>');
	body.append('<br><br><iframe class="interface" width="420" height="345" src='+url+'></iframe>');
};
