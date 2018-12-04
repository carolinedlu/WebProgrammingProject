var builtInterface = 0;

Backend.Authenticate();

async function buildModelsInterface() {
    emptyInterface();
    let body = $('body');
    body.append('<h1 class=modelHeader">Select an airplane model:</h1>');
    const models = await Backend.GetPlanes();
     $('body').append('<select id="dropDown"><option selected="true" disabled="true">Select a model</option></select><br><br>');

    for (const model of models) { //Why is this loop not running?!?!?!?
        let option = document.createElement("option");
        option.text = model.name;
        option.value = model.name;
        document.getElementById("dropDown").options.add(option); //Add plane to drop-down menu
    }

    let selected_model = null;
     
body.append('<div class="menuDiv"></div>');
//  $('<button class="button" onclick="buildDestinationsInterface()">Destinations</button>').appendTo('.menuDiv');

body.append('<div class="newDiv"></div>');
body.append('<div class="revDiv"></div>');
	
   // const passengers_button = $('<button id="passengers">Passengers</button>').click(() => {
    //    if (selected_model !== null) {
     //       buildPassengersInterface(selected_model);
      //  }
    //});
    //body.append(passengers_button);

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

 function buildModelInterface() {
    let body = $('body');
    $('.models-container').toggle();
 };

function emptyInterface() {
    let body = $('body');
    body.empty();
    body.append('<button class="homeBtn" onclick="buildHomeInterface()">Home</button><br>');
};

function buildReviewInterface(model) {
	$('<h1>Reviews</h1>').appendTo('.revDiv');

    const visible_reviews = $('<div id="visible-reviews">');
    const updateReviews = () => {
        visible_reviews.empty();
        const reviews = Reviews.Get(model);
        for (const review of reviews) {
            visible_reviews.append(`<p id="reviews"><em>${review}</em></p>`);
        }
    };

	let body = $('body');
    body.append(visible_reviews);
    updateReviews();
    $('<h2>Enter a new review of X model<h2><textarea id="newReview" name="textarea" style="width:250px;height:150px;"></textarea>').appendTo('.revDiv');
    $('<button id="submitNewReview" onclick="submitNewReview()">Submit Review</button>').appendTo('.revDiv');

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

var map;
function initMap(lat, lng) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
        lat: 35.9100, lng: -79.0533},
    zoom: 8
  });
}

function buildDestinationsInterface() {
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    $('<h1 class="interface">Destinations interface here</h1>').appendTo('.newDiv');
    builtInterface=1;
	body.append('<h2 class="interface">Countries</h2>');
	//body.append('<br><div id="map"></div><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSkCRuJOE-EZ3ZnGn8zDB7f0ilfJkyZSE&callback=initMap" async defer></script>');
};

// function buildPassengersInterface(model) {
//     if (builtInterface === 1) {
//         $('.interface').empty();
//     }
//     $('<h1 class="interface">Passengers interface here</h1>').appendTo('.newDiv');
//     builtInterface=1;

// const all_passengers = $('<div id="visible-reviews" class="interface">');
//     let passengers_on_plane = [];
//     const updatePassengers = () => {
//         all_passengers.empty();
//         for (const passenger of passengers_on_plane) {
//             all_passengers.append(`<p><em>${passenger.first_name} ${passenger.last_name}</em></p>`);
//         }
//     };

//     ('<h2>Passengers On This Plane</h2>').appendTo('.newDiv');
//     (all_passengers).appendTo('.newDiv');
//     Backend.GetPassengersThatFlewOnPlane(model).then((passengers) => {
//         passengers_on_plane = passengers;
//         updatePassengers();
//     });
// };

function buildHomeInterface() {
    let body = $('body');
    body.empty();
	      body.append('<div class="homeDiv"></div>');
      $('<h1 id="pageTitle">Airplane Model Comparison Tool</h1>').appendTo('.homeDiv');
      $('<button class="button" onclick="buildModelInterface()">Models</button>').appendTo('.homeDiv');
};

async function displayVideos(planeObj) {
    let url = await YouTube.GetTopVideoForPlane(planeObj);
    let body = $('body');
    body.append('<p>View videos here<p>');
	body.append('<br><br><iframe class="interface" width="420" height="345" src='+url+'></iframe>');
};


async function buildAirportsInterface() {
    emptyInterface();
    const ports = await Backend.GetAirports();
    let body = $('body');
    body.append('<select id="airportDropDown"><option selected="true" disabled="true">Select an airport</option></select>');

    for (const port of ports) {
        let option = document.createElement("option");     
        option.text = port.name;
        option.value = port.name;
        document.getElementById("airportDropDown").options.add(option); //Add airport to drop-down menu
    }

    $("#airportDropDown").change(function selectAirport(){ //Every time user selects a different airport
        $("#airportName").remove();
        let selection = document.getElementById("airportDropDown");
        let selectionName = selection.options[selection.selectedIndex].value;
        body.append("<h1 id='airportName'>"+selectionName+"</h1>");
        for (const port of ports) {
            if (port.name === selectionName) {
                buildReviewInterface(port); //Set up review interface for this plane
                displayVideos(port); //Display Youtube videos for this plane
            }
        }
    });
};
