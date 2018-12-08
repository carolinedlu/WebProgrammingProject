
  var builtInterface = 0;

  function buildModelsInterface() {
      emptyInterface();
      let body = $('body');
      //Possibly have a carousel here with airplane models. For now, drop-down menu.
      body.append('<h1 class="modelHeader">Select an airplane model:</h1>');
      //This section should dynamically generate choices based on the airplane models that are in the database. For now, static options.

      body.append('<div class="selectDiv"></div>');
      $('<select><option id="modA" value="ModelA">Model A</option><option id="modB" value="ModelB">Model B</option><option id="modC" value="ModelC">Model C</option><option value="ModelD">Model D</option></select><br><br>').appendTo('.selectDiv');

      body.append('<div class="menuDiv"></div>');
      $('<button class="button" onclick="buildDestinationsInterface()">Destinations</button>').appendTo('.menuDiv');
      $('<button class="button" onclick="buildMileageInterface()">Mileage</button>').appendTo('.menuDiv');
  	  $('<button class="button" onclick="buildPassengersInterface()">Passengers</button>').appendTo('.menuDiv');

      body.append('<div class="newDiv"></div>');
      body.append('<div class="revDiv"></div>');

  	  buildReviewInterface();
  	//User selects a model from the dynamically generated dropdown list. Get the name of the model from the user's selection. Set planeName = name of model selected by user.
  	  let planeName = "Model A";
  	//let planeName = document.getElementById("modA").value; //Change this to get plane name based on selection from dynamically created menu
      $('<button class="button" onclick="displayVideos('+planeName+')">Videos</button>').appendTo('.menuDiv');
  };

  function emptyInterface() {
      let body = $('body');
      body.empty();
      body.append('<button class="homeBtn" onclick="buildHomeInterface()">Home</button><br>');
  };

  function buildModelInterface() {
    let body = $('body');
    $('.models-container').toggle();
  }

  function buildReviewInterface() {
  	let body = $('body');
  	$('<h1>Reviews</h1>').appendTo('.revDiv');
  	$('<p>Display average stars out of five and a count of total reviews here</p>').appendTo('.revDiv');
  	$('<p>Display excerpts from reviews here</p>').appendTo('.revDiv');
    $('<h2>Enter a new review of X model<h2><textarea id="newReview" name="textarea" style="width:250px;height:150px;"></textarea>').appendTo('.revDiv');
  	$('<button onclick="submitNewReview()">Submit Review</button>').appendTo('.revDiv');
  }

  function buildDestinationsInterface() {
      if(builtInterface === 1) {
        $('.interface').empty();
      }
      let body = $('body');
      // body.append('<h1 class="interface">Destinations interface here</h1>');
      $('<h1 class="interface">Destinations interface here</h1>').appendTo('.newDiv');
      builtInterface=1;
  	  //Show states/airports that model has flown in and out of + reviews for model

  	  $('<h2 class="interface">Countries</h2>').appendTo('.newDiv');
  	  $('<p class="interface">Display countries here</p>').appendTo('.newDiv');

  	  $('<h2 class="interface">Airports</h2>').appendTo('.newDiv');
  	  $('<p class="interface">Display airports here</p>').appendTo('.newDiv');
  };

  function buildMileageInterface() {
      if (builtInterface === 1) {
          $('.interface').empty();
      }
      let body = $('body');
      $('<h1 class="interface">Mileage interface here</h1>').appendTo('.newDiv');
      builtInterface=1;
  	//Show airplane model mileage
  	  $('<h2 class="interface">Display number of miles traveled by this model here</h2>').appendTo('.newDiv');

  };

  function buildPassengersInterface() {
      if (builtInterface === 1) {
          $('.interface').empty();
      }
      let body = $('body');
      $('<h1 class="interface">Passengers interface here</h1>').appendTo('.newDiv');
      builtInterface=1;
  	//Show reviews from passengers on airplane model?
  	  $('<h2 class="interface">Display number of passengers that have rode on this model here</h2>').appendTo('.newDiv');
  };

  function buildHomeInterface() {
      let body = $('body');
      body.empty();
      body.append('<div class="homeDiv"></div>');
      $('<h1 id="pageTitle">Airplane Model Comparison Tool</h1>').appendTo('.homeDiv');
      $('<button class="button" onclick="buildModelInterface()">Models</button>').appendTo('.homeDiv');
      $('<button class="button" onclick="buildMapInterface()">Airports</button>').appendTo('.homeDiv');
  };


  function submitNewReview() {
  	let obj = 0; //What should this be?
      let review = document.getElementById("newReview").value;
  	console.log(review);
  	Reviews.Add(obj, review);
  };

  function displayVideos(planeName) {
  	let url = YouTube.GetTopVideoForPlane(planeName);
      let body = $('body');
  	body.append('<br><br><iframe class="interface" width="420" height="345" src='+url+'></iframe>');
  };
