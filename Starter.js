//$(document).ready(() => {
//};
var builtInterface = 0;

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
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    let body = $('body');
    body.append('<h1 class="interface">Destinations interface here</h1>');
    builtInterface=1;
    //Show states/airports that model has flown in and out of + reviews for model
};

function buildMileageInterface() {
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    let body = $('body');
    body.append('<h1 class="interface">Mileage interface here</h1>');
    builtInterface=1;
    //Show airplane model mileage
};

function buildPassengersInterface() {
    if (builtInterface === 1) {
        $('.interface').empty();
    }
    let body = $('body');
    body.append('<h1 class="interface">Passengers interface here</h1>');
    builtInterface=1;
    //Show reviews from passengers on airplane model?
};

function buildHomeInterface() {
    let body = $('body');
    body.empty();
    body.append('<button class="button" onclick="buildModelsInterface()">Models</button>');
    body.append('<button class="button" onclick="buildMapInterface()">Map</button>');
};
