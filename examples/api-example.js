$(document).ready(async () => {
	await Backend.Authenticate().done();

	// Example for latitude and longitude
	Backend.GetPlanes().then((planes) => {
		const plane = planes[0];
		console.log(plane);
		Backend.GetAirportDeparturesAndArrivalsForPlane(plane).then((flights) => {
			for (const flight of flights) {
				// Can also use flight.departure.latitude and flight.departure.longitude
				const latitude = parseFloat(flight.arrival.latitude);
				const longitude = parseFloat(flight.arrival.longitude);
				console.log(`This plane arrived in ${flight.arrival.city} (${latitude}, ${longitude})`);
			}
		});
	});
});
