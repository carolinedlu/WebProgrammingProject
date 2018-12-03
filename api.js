const API_ROOT = "http://comp426.cs.unc.edu:3001"
const API_USERNAME = "ilovekmp"
const API_PASSWORD = "ilovekmp"

const YOUTUBE_ROOT = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_API_KEY = 'AIzaSyAkFNgi0mQGVObecEH08c5VrWGSHENksRw';

class Backend {

	// Public API

	static Authenticate() {
		const user = ResourceFactory.User({
			"username": API_USERNAME,
			"password": API_PASSWORD,
		});
		return Ajax.POST(`/sessions`, user);
	}

	static GetPlanes() {
		return Ajax.GET(`/planes`);
	}

	static GetAirports() {
		return Ajax.GET(`/airports`);
	}

	static GetPassengers() {
		return Ajax.GET(`/tickets`);
	}

	static UpdatePlane(plane) {
		const resource = ResourceFactory.Plane(plane);
		return Ajax.PUT(`/planes/${plane.id}`, resource);
	}

	static UpdateAirport(airport) {
		const resource = ResourceFactory.Airport(airport);
		return Ajax.PUT(`/airports/${airport.id}`, resource);
	}

	static AddPassenger(passenger) {
		const resource = ResourceFactory.Ticket(passenger);
		return Ajax.POST(`/tickets`, resource);
	}
}

class Reviews {

	// Public API

	static Add(obj, review) {
		const reviews = Reviews.Get(obj);
		reviews.push(review);
		obj.info = JSON.stringify(reviews);
	}

	static Get(obj) {
		return JSON.parse(obj.info) || [];
	}

}

class ResourceFactory {

	// Public API

	static User(user) {
		return ResourceFactory.ConstructNamedPostData("user", user);
	}

	static Airline(airline) {
		return ResourceFactory.ConstructNamedPostData("airline", airline);
	}

	static Airport(airport) {
		return ResourceFactory.ConstructNamedPostData("airport", airport);
	}

	static Flight(flight) {
		return ResourceFactory.ConstructNamedPostData("flight", flight);
	}

	static Instance(instance) {
		return ResourceFactory.ConstructNamedPostData("instance", instance);
	}

	static Itinerary(itinerary) {
		return ResourceFactory.ConstructNamedPostData("itinerary", itinerary);
	}

	static Plane(plane) {
		return ResourceFactory.ConstructNamedPostData("plane", plane);
	}

	static Seat(seat) {
		return ResourceFactory.ConstructNamedPostData("seat", seat);
	}

	static Ticket(ticket) {
		return ResourceFactory.ConstructNamedPostData("ticket", ticket);
	}

	// (Private) Helper Functions

	static ConstructNamedPostData(name, value) {
		const data = {};
		data[name] = value;
		return data;
	}
}

class Ajax {

	// Public API

	static GET(endpoint) {
		return Ajax.PerformRequest('GET', endpoint, null);
	}

	static POST(endpoint, data) {
		return Ajax.PerformRequest('POST', endpoint, data);
	}

	static PUT(endpoint, data) {
		return Ajax.PerformRequest('PUT', endpoint, data);
	}

	static DELETE(endpoint) {
		return Ajax.PerformRequest('DELETE', endpoint, null);
	}

	// (Private) Helper Functions

	static PerformRequest(method, endpoint, data) {
		console.debug(`${method} -> ${endpoint}; data:`, data);
		const url = `${API_ROOT}/${endpoint}`;
		return $.get({
			url: url,
			method: method,
			xhrFields: { withCredentials: true },
			data: data,
			crossDomain: true,
		}).fail((reason) => {
			console.error(reason.statusText);
			alert(`Error executing ${method} to ${url}: ${reason.statusText}`);
		});
	}
}

class YouTube {

	// Public API

	static async GetTopVideoForPlane(plane) {
		const [result, err] = await til(YouTube.search(plane.name));
		if (err !== null) {
			throw err;
		}

		if (result.items.length === 0) {
			throw Error(`No embeddable video search results found!`);
		}

		const videoId = result.items[0].id.videoId;
		return `https://www.youtube.com/embed/${videoId}`;
	}

	// (Private) Helper Methods
	static async search(query) {
		const params = [
			`part=snippet`,
			`type=video`,
			`videoEmbeddable=true`,
			`key=${YOUTUBE_API_KEY}`,
			`q=${query}`,
		];
		const url = `${YOUTUBE_ROOT}?${params.join('&')}`;
		return $.get({
			url: url,
			method: 'GET',
			crossDomain: true,
		}).fail((reason) => {
			console.error(reason.statusText);
			alert(`Error executing ${method} to ${url}: ${reason.statusText}`);
		});
	}
}

// Helper method to wrap async/await error handling
async function til(promise) {
	try {
		const data = await promise;
		return [data, null];
	} catch(e) {
		return [null, e];
	}
}
