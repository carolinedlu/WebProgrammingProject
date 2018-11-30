//$(document).ready(() => {
//};


function buildModelsInterface() {
    emptyInterface();
    let body = $('body');
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
    body.append('<button onclick="buildHomeInterface()">Home</button>');
};

function buildDestinationsInterface() {
    emptyInterface();

};

function buildMileageInterface() {
    emptyInterface();

};

function buildPassengersInterface() {
    emptyInterface();


};

function buildHomeInterface() {
    let body = $('body');
    body.empty();
    body.append('<button class="button" onclick="buildModelsInterface()">Models</button>');
    body.append('<button class="button" onclick="buildMapInterface()">Map</button>');
};
