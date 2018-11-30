//$(document).ready(() => {
//};
var mileage = 0;
var destinations = 0;
var passengers = 0;

function buildModelsInterface() {
    emptyInterface();
    let body = $('body');
    //Possibly have a carousel here with airplane models. For now, drop-down menu.
    body.append('<h1>Select an airplane model:</h1>');
    //This section should dynamically generate choices based on the airplane models that are in the database. For now, static options.
    body.append('<select><option value="ModelA">Model A</option><option value="ModelB">Model B</option><option value="ModelC">Model C</option><option value="ModelD">Model D</option></select><br><br>');


    body.append('<button onclick="buildDestinationsInterface()">Destinations</button>');
    body.append('<button onclick="buildMileageInterface()">Mileage</button>');
    body.append('<button onclick="buildPassengersInterface()">Passengers</button>');
};

function buildMapInterface() {
    emptyInterface();
};

function emptyInterface() {
    let body = $('body');
    body.empty();
    body.append('<button onclick="buildHomeInterface()">Home</button><br>');
};

function buildDestinationsInterface() {
    if (mileage === 1) {
        $('#mileage').empty();
    } if (passengers === 1) {
        $('#passengers').empty();
}
    let body = $('body');
    body.append('<h1 id="destinations">Destinations interface here</h1>');
    destinations = 1;
  
    //Show states/airports that model has flown in and out of + reviews for model
};

function buildMileageInterface() {
    if (destinations === 1) {
        $('#destinations').empty();
    } if (passengers === 1) {
        $('#passengers').empty();
    }
    let body = $('body');

    body.append('<h1 id="mileage">Mileage interface here</h1>');
    mileage = 1;
 
    
    //Show airplane model mileage
};

function buildPassengersInterface() {
    if (destinations === 1) {
        $('#destinations').empty();
    } if (mileage === 1) {
        $('#mileage').empty();

    }
    let body = $('body');
    body.append('<h1 id="mileage">Passengers interface here</h1>');
    passengers = 1;

 

    //Show reviews from passengers on airplane model?
};

function buildHomeInterface() {
    let body = $('body');
    body.empty();
    body.append('<button class="button" onclick="buildModelsInterface()">Models</button>');
    body.append('<button class="button" onclick="buildMapInterface()">Map</button>');
};
