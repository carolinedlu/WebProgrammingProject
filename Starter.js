//$(document).ready(() => {
//};

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
    let body = $('body');

    body.append('<h1>Destinations interface here</h1>');

    //Show states/airports that model has flown in and out of + reviews for model
};

function buildMileageInterface() {
    let body = $('body');

    body.append('<h1>Mileage interface here</h1>');
    //Show airplane model mileage
};

function buildPassengersInterface() {
    let body = $('body');

    body.append('<h1>Passengers interface here</h1>');

    //Show reviews from passengers on airplane model?
};

function buildHomeInterface() {
    let body = $('body');
    body.empty();
    body.append('<button class="button" onclick="buildModelsInterface()">Models</button>');
    body.append('<button class="button" onclick="buildMapInterface()">Map</button>');
};
