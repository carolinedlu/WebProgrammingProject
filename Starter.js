var builtInterface = 0;

Backend.Authenticate();

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

    let selected_model = null;

    body.append('<button id="destinations" onclick="buildDestinationsInterface()">Destinations</button>');
    body.append('<button id="mileage" onclick="buildMileageInterface()">Mileage</button>');

    const passengers_button = $('<button id="passengers">Passengers</button>').click(() => {
        if (selected_model !== null) {
            buildPassengersInterface(selected_model);
        }
    });
    body.append(passengers_button);

    $("#dropDown").change(function planeObject(){ //Every time user selects a different plane
        for (const model of models) { //Why is this loop not running?!?!?!?
            let selection = document.getElementById("dropDown");
            let selectionName = selection.options[selection.selectedIndex].value;
            if (model.name === selectionName) {
                console.log("success");
                selected_model = model;
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
    const visible_reviews = $('<div id="visible-reviews">');
    const updateReviews = () => {
        visible_reviews.empty();
        const reviews = Reviews.Get(model);
        for (const review of reviews) {
            visible_reviews.append(`<p><em>${review}</em></p>`);
        }
    };

	let body = $('body');
    body.append('<div id="reviews"><h1>Reviews</h1>');
    body.append(visible_reviews);
    updateReviews();
    body.append('<h2>Enter a new review of X model<h2><textarea id="newReview" name="textarea" style="width:250px;height:150px;"></textarea>');
    body.append('<button id="submitNewReview">Submit Review</button></div>');
    let submit = document.getElementById("submitNewReview");
    submit.addEventListener("click", function submitNewReview() {
         let review = document.getElementById("newReview").value;
         Reviews.Add(model, review);
         Backend.UpdatePlane(model).then(() => {
            updateReviews();
         }).catch(() => {
            alert("There was an error adding your review. Please try resubmitting.");
         });


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

function buildPassengersInterface(model) {
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    let body = $('body');
    body.append('<h1 class="interface">Passengers interface here</h1>');
    builtInterface=1;

	const all_passengers = $('<div id="visible-reviews" class="interface">');
    let passengers_on_plane = [];
    const updatePassengers = () => {
        all_passengers.empty();
        for (const passenger of passengers_on_plane) {
            all_passengers.append(`<p><em>${passenger.first_name} ${passenger.last_name}</em></p>`);
        }
    };

    body.append('<h2>Passengers On This Plane</h2>');
    body.append(all_passengers);
    Backend.GetPassengersThatFlewOnPlane(model).then((passengers) => {
        passengers_on_plane = passengers;
        updatePassengers();
    });
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
