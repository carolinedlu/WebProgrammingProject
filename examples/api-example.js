$(document).ready(() => {
	Backend.Authenticate().done(() => {
		console.log('Successfully authenticated!');
		DoPlaneExample();
	});
});

function DoPlaneExample() {
	Backend.GetPlanes().then((planes) => {
		if (planes.length === 0) {
			alert('Database has not been seeded!');
			return;
		}

		const plane = planes[0];
		console.log('Here is a plane: ', plane);
		console.log(`  Reviews (before):`, Reviews.Get(plane));
		console.log(`  Let's fix that by adding a review...`);
		Reviews.Add(plane, {
			rating: 10,
			text: "I had a wonderful experience flying this plane!",
			name: "A. Pilot",
		});
		console.log(`  Reviews (after):`, Reviews.Get(plane));

		Backend.UpdatePlane(plane);
		DoYouTubeExample(plane);
	});
}

// YouTube API query example
function DoYouTubeExample(plane) {
	YouTube.GetTopVideoForPlane(plane).then((link) => {
		console.log(`Link to top video result:`, link);
	}).catch((err) => {
		alert(err);
	});
}
