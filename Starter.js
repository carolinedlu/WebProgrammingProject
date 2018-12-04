var builtInterface = 0;

Backend.Authenticate();

async function buildModelsInterface() {
	let body = $('body');
	emptyInterface(); //Clear page
	body.append('<h1 class=modelHeader">Select an airplane model:</h1>');
	const models = await Backend.GetPlanes();
	body.append('<select id="dropDown"><option selected="true" disabled="true">Select a model</option></select><br><br>');

    for (const model of models) {
        let option = document.createElement("option");
        option.text = model.name;
        option.value = model.name;
        document.getElementById("dropDown").options.add(option); //Add plane to drop-down menu
    }

	let selected_model = null;
 
	body.append('<div class="menuDiv"></div>');
	body.append('<button class="button" onclick="buildDestinationsInterface()">Destinations</button>');
	body.append('<div class="newDiv"></div>');
	body.append('<div class="revDiv"></div>');
	
   // const passengers_button = $('<button id="passengers">Passengers</button>').click(() => {
    //    if (selected_model !== null) {
     //       buildPassengersInterface(selected_model);
      //  }
    //});
    //body.append(passengers_button);

    $("#dropDown").change(function planeObject(){ //Every time user selects a different plane
		$("#videoTitle").remove();
		$("#video").remove();
		$("#reviewsTitle").remove();
		$("#visible-reviews").remove();
		$("#specificReviewTitle").remove();
		$("#newReview").remove();
		$("#submitNewReview").remove();
	    	$("#planeName").remove();
		
            let selection = document.getElementById("dropDown");
            let selectionName = selection.options[selection.selectedIndex].value;
	    body.append("<h1 id='planeName'>"+selectionName+"</h1>");
	    
	    for (const model of models) {
            if (model.name === selectionName) {
                selected_model = model;
                buildReviewInterface(model); //Set up review interface for this plane
                displayVideos(model); //Display Youtube videos for this plane
            }
        }
    });
};

 function buildModelInterface() {
    $('.models-container').toggle();
 };

function emptyInterface() {
	let body = $('body');
	body.empty();
	body.append('<button class="homeBtn" onclick="buildHomeInterface()">Home</button><br>');
};

function buildReviewInterface(model) {
	console.log("reviews method called");
	let body = $('body');
	body.append('<h1 id="reviewsTitle">Reviews</h1>');
	const visible_reviews = $('<div id="visible-reviews">');
	const updateReviews = () => {
	visible_reviews.empty();
	const reviews = Reviews.Get(model);
        for (const review of reviews) {
            visible_reviews.append(`<p id="reviews"><em>${review}</em></p>`);
        }
    };

body.append(visible_reviews);
updateReviews();
body.append('<h2 id="specificReviewTitle">Enter a new review of the '+model.name+'<h2><textarea id="newReview" name="textarea" style="width:250px;height:150px;"></textarea>');
body.append('<button id="submitNewReview" onclick="submitNewReview()">Submit Review</button>');

 //   $('<h2>Enter a new review of X model<h2><textarea id="newReview" name="textarea" style="width:250px;height:150px;"></textarea>').appendTo('.revDiv');
 //   $('<button id="submitNewReview" onclick="submitNewReview()">Submit Review</button>').appendTo('.revDiv');

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
	body.append('</div>');
};

function buildDestinationsInterface() {
	//console.log(builtInterface);
	//if (builtInterface === 0) {
	let body = $('body');

// if (builtInterface === 1) {
//         $('.interface').empty();
//     }
//body.append('<h1 class="interface">Destinations</h1>');	
body.append('<div id="map"></div><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSkCRuJOE-EZ3ZnGn8zDB7f0ilfJkyZSE&callback=initMap" async defer></script>');
 	//builtInterface=1;
	//}
};

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

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
	body.append('<h1 id="pageTitle">Airplane Model Comparison Tool</h1>');
	body.append('<button class="button" onclick="buildModelsInterface()">Models</button>');
	body.append('<button class="button" onclick="buildAirportsInterface()">Airports</button>');
      //$('<h1 id="pageTitle">Airplane Model Comparison Tool</h1>').appendTo('.homeDiv');
      //$('<button class="button" onclick="buildModelsInterface()">Models</button>').appendTo('.homeDiv');
	//$('<button class="button" onclick="buildAirportsInterface()">Airports</button>').appendTo('.homeDiv');

};

async function displayVideos(planeObj) {
	let body = $('body');
	let name = planeObj.name;

    let url = await YouTube.GetTopVideoForPlane(planeObj);
	console.log(planeObj);
   	body.append('<h1 id="videoTitle">Videos of the '+name+'<h1>');
	body.append('<iframe id="video" class="interface" width="420" height="345" src='+url+'></iframe>');
};


async function buildAirportsInterface() {
	let body = $('body');

    emptyInterface();
    const ports = await Backend.GetAirports();
    body.append('<select id="airportDropDown"><option selected="true" disabled="true">Select an airport</option></select>');

    for (const port of ports) {
        let option = document.createElement("option");     
        option.text = port.name;
        option.value = port.name;
        document.getElementById("airportDropDown").options.add(option); //Add airport to drop-down menu
    }

    $("#airportDropDown").change(function selectAirport(){ //Every time user selects a different airport
	    console.log("changed selection");
        $("#airportName").remove();
	$("#videoTitle").remove();
	$("#video").remove();
	$("#reviewsTitle").remove();
	$("#visible-reviews").remove();
	$("#specificReviewTitle").remove();
	$("#newReview").remove();
	$("#submitNewReview").remove();
	    
	    
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
