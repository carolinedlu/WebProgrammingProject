var airports = 0;
var map;

Backend.Authenticate();

$(document).mousemove(function(e){
    $("#image").css({left:e.pageX - 25, top:e.pageY - 25});
});

async function buildModelsInterface() {
	let body = $('body');
	emptyInterface(); //Clear page
	const models = await Backend.GetPlanes();
  body.append('<div class="menuDiv"></div>');
  $('<select id="dropDown"><option selected="true" disabled="true">Select a model</option></select>').appendTo('.menuDiv');

    for (const model of models) {
        let option = document.createElement("option");
        option.text = model.name;
        option.value = model.name;
        document.getElementById("dropDown").options.add(option); //Add plane to drop-down menu
    }

	let selected_model = null;

    $("#dropDown").change(function planeObject(){ //Every time user selects a different plane
		$("#reviewsTitle").remove();
		$("#visible-reviews").remove();
		$("#review-form").remove();
    $("#videoTitle").remove();
		$("#video").remove();
	  $("#planeName").remove();
	  $("#spaces").remove();
	 	$("#map").remove();
	 	$("#mapAPI").remove();
	 	$("#spacesAfterMap").remove();
	 	$("#destinationsTitle").remove();
    $(".revDiv").remove();
    $(".videoDiv").remove();
    $(".destContainer").remove();


      let selection = document.getElementById("dropDown");
      let selectionName = selection.options[selection.selectedIndex].value;
	    body.append("<h1 id='planeName'>"+selectionName+"</h1>");

	    for (const model of models) {
            if (model.name === selectionName) {
                selected_model = model;
                buildReviewInterface(model); //Set up review interface for this plane
                displayVideos(model); //Display Youtube videos for this plane
                buildDestinationsInterface(model);
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

// REVIEWS
function buildReviewInterface(model) {
	console.log("reviews method called");
	let body = $('body');
	body.append('<h2 id="reviewsTitle">Reviews</h2>');
  body.append('<div class="revDiv"></div>');
	const visible_reviews = $('<div id="visible-reviews">');
	const updateReviews = async () => {
	    const reviews = Reviews.Get(model);
        const fake_reviews = await GetFakePassengerReviews(model);
        visible_reviews.empty();
        for (const review of fake_reviews.concat(reviews)) {
            visible_reviews.append(`<p id="reviews"><em>${review.text}</em> ~ ${review.name}</p>`);
        }
    };

    body.append(visible_reviews);
    $('<div class="visRevDiv"></div>').appendTo('.revDiv');
    updateReviews();
    const review_form = $('<div id="review-form">');
    body.append(review_form);
    $(visible_reviews).appendTo('.visRevDiv');

    review_form.append(`<h3 id="specificReviewTitle">Enter a new review of the ${model.name}</h3>`);
    review_form.append(`<input id="review-name" placeholder="Name"><br><br>`);
    review_form.append('<textarea id="newReview" name="textarea" style="width:250px;height:150px;"></textarea><br>');
    review_form.append('<button id="submitNewReview">Submit Review</button>')
    $(review_form).appendTo('.revDiv');

    let submit = document.getElementById("submitNewReview");
    submit.addEventListener("click", function submitNewReview() {
        const name = $('#review-name').val();
        const text = document.getElementById("newReview").value;
        if (name.length === 0 || text.length === 0) {
            return alert('Both name and review must be filled out!');
        }

        Reviews.Add(model, name, text);
        const updatePromise = (model.city === undefined) ? Backend.UpdatePlane(model) : Backend.UpdateAirport(model);
        updatePromise.then(async () => {
            await updateReviews();
            $('#review-name').val('');
            $('#newReview').val('');
        }).catch(() => {
            alert("There was an error adding your review. Please try resubmitting.");
        });
    }, false);
	body.append('</div>');
};

// DESTINATIONS
function buildDestinationsInterface(plane) {
    let body = $('body');
    body.append('<div class="destContainer"></div>');
    $('<div id="map"></div>').appendTo('.destContainer');
    body.append('<script id="mapAPI" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZpI3CbtNz2qkNW6N7YzHLqlPxzX6QadM&callback=initMap" async defer></script>');
    $('#mapAPI').appendTo('#map');

    Backend.GetAirportDeparturesAndArrivalsForPlane(plane).then((flights) => {
        var i = 0;
        for (const flight of flights) {
            if (i < flights.length) {
            // Can also use flight.departure.latitude and flight.departure.longitude
            const latitude = parseFloat(flight.arrival.latitude);
            const longitude = parseFloat(flight.arrival.longitude);
            addFlag(latitude, longitude);
            i++;
            }
        }
    });
};

function addFlag(latitude, longitude) {
var marker = new google.maps.Marker({
    position: {lat: latitude, lng: longitude},
    map: map,
    title: 'Hello World!'
    });
};

// AIRPORT MAP
function buildAirportsMapInterface(airport) {
    let body = $('body');
    body.append('<div id="map"></div>');
    $('<div class="aiportMapContainer"><h1 id="destinationsTitle">Map</h1></div>').appendTo('#map');
    body.append('<script id="mapAPI" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZpI3CbtNz2qkNW6N7YzHLqlPxzX6QadM&callback=initMap" async defer></script>');
    currentAirport = airport;
};

function initMap() {
    var myLatLng = {lat: 39.8283, lng: -98.5795};

    map = new google.maps.Map(document.getElementById('map'), {
         zoom: 3,
         center: myLatLng
       });
if (airports===1) {
  changeMapFocus(currentAirport.latitude, currentAirport.longitude);
}
};

function changeMapFocus(lat, long) {
    map.setCenter(new google.maps.LatLng(lat, long) );
};

async function GetFakePassengerReviews(model) {
    const fake_reviews = [
        `Thank you airport, very cool!!!`,
        `I saw a rat eating a pizza. Will definitely be returning in the near future.`,
        `Okay, I guess, nothing compared to the Hard Rock Cafe though.`,
        `The flight was okay, but the greedy pilot wouldn't let me drive. I just wanted to fly for five minutes, Captain Steve!!!`,
        `Loved the flight attendants, but I sat next to some guy named KMP, and he wouldn't stop asking me to give him a review on rate my professor dot com???`,
        `So what's the deal with airline food anyway?`,
        `Back in my day you had to train a dragon to fly you from city to city, today's kids are so spoiled.`,
        `Turns out, you CAN'T just get up during a flight and break into dance and song. 10/10 for the lovely flight staff, the cabin they put me in was quite spacious :).`,
        `There was a bar. 14/10.`,
        `The only thing I'd change about this place is if they were to allow my emotional support emu.`
    ];

    const passengers = await Backend.GetPassengersThatFlewOnPlane(model);
    return passengers.map((passenger) => {
        return {
            name: `${passenger.first_name} ${passenger.last_name}`,
            text: fake_reviews[Math.floor(Math.random() * fake_reviews.length)],
        };
    });
}

// HOME
function buildHomeInterface() {
	let body = $('body');

	body.empty();
  body.append('<img id="image" src="planeMouse.png"/>');
	body.append('<div class="homeDiv"></div>');
	body.append('<h1 id="pageTitle">Airplane Model Comparison Tool</h1>');
  body.append('<div id="buttons-container"></div>');
  $('<button class="button" onclick="buildModelsInterface()">Models</button>').appendTo('#buttons-container');
  $('<button class="button" onclick="buildAirportsInterface()">Airports</button>').appendTo('#buttons-container');
  body.append('<footer><p>Created by Roman Rogowski, Caroline Lu, and Dominique Jabbour - 2018</p></footer>');
  $(document).mousemove(function(e){
      $("#image").css({left:e.pageX-25, bottom:e.pageY-25});
  });
};

// VIDEOS
async function displayVideos(planeObj) {
	let body = $('body');
	let name = planeObj.name;

    let url = await YouTube.GetTopVideoForPlane(planeObj);
	console.log(planeObj);
    $('<div class="videoDiv"><h2 id="videoTitle">Videos of the '+name+'<h2><iframe id="video" class="interface" width="500" height="300" src='+url+'></iframe></div>').appendTo('.destContainer');
};

// AIRPORTS
async function buildAirportsInterface() {
	let body = $('body');

    emptyInterface();
    const ports = await Backend.GetAirports();
    body.append('<div class="menuDiv"></div>');
    $('<select id="airportDropDown"><option selected="true" disabled="true">Select an airport</option></select>').appendTo('.menuDiv');

    for (const port of ports) {
        let option = document.createElement("option");
        option.text = port.name;
        option.value = port.name;
        document.getElementById("airportDropDown").options.add(option); //Add airport to drop-down menu
    }

  $("#airportDropDown").change(function selectAirport(){ //Every time user selects a different airport
  $("#airportName").remove();
	$("#videoTitle").remove();
	$("#video").remove();
	$("#reviewsTitle").remove();
	$("#visible-reviews").remove();
	$("#review-form").remove();
	$("#spaces").remove();
	$("#map").remove();
	$("#mapAPI").remove();
	$("#spacesAfterMap").remove();
	$("#destinationsTitle").remove();
  $(".revDiv").remove();
  $(".videoDiv").remove();

        let selection = document.getElementById("airportDropDown");
        let selectionName = selection.options[selection.selectedIndex].value;
        body.append("<h1 id='airportName'>"+selectionName+"</h1>");
        for (const port of ports) {
            if (port.name === selectionName) {
                buildReviewInterface(port); //Set up review interface for this plane
                displayVideos(port); //Display Youtube videos for this plane
		            buildAirportsMapInterface(port);

            }
        }
    });
};
