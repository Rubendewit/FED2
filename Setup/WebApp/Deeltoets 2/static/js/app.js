var app = app || {};

(function(){
	app.controller = { 				// Controller function, starts the rest of the function.
		init: function() {
			app.xhr.loadItem('http://dennistel.nl/movies', function() { // Loads the data, after that, load the rest.
				app.sections.init(); 	// Starts the section init.
				app.router.init(); 		// Starts the router init.
				app.gestures.init();	// Starts the gestures init	.
			});
		}
	};

	app.router = {										// Router function.
		init: function(){
			routie({ 									// Routie looks at the # in the URL.
				'': function() {						// If there is none, show the homepage.
					app.sections.toggle('home-page');
				},
				'home': function() {					// If 'home' is after the #, show the homepage.
					app.sections.toggle('home-page');
				},
    			'about': function() {					// If 'about' is after the #, show the about page.
    				app.sections.toggle('about-page');
    			},
   		 		'movies': function() {					// If 'movies' is after the #, show the movies page.
   		 			app.sections.toggle('movie-page');	
    			},
    			'movies/genre/?:genre': function(genre) {		// If there is a genre behind the hash 'movies/genre', it will only show movies with that genre.
			    	app.sections.movies(genre);
			    },
			    'movies/rating/?:order': function(order) {		// If there is an order behind the hash 'movies/rating', it will show movies based on their rating.
			    	app.sections.movies(order);
			    },
			    'movies/date/?:order': function(order) {			// If there is an order behind the hash 'movies/date', it will show movies based on their release date.
			    	app.sections.movies(order);
			    },
			    'movie/:movieTitle': function(movieTitle) {			// If there is a title behind the hash 'movie', show the detail page from that movie.
			    	app.sections.toggle('detail-page');	
			    	app.sections.detail(movieTitle);
			    }
			});
		}
	};

	app.sections = {									// Sections function
		init: function() {

			this.home();			// Starts the home function.
			this.about();			// Starts the about function.
			this.movies();			// Starts the movies function.
		},
		toggle: function(id) {											// The function uses the div ID given by the app.sections.toggle in routie.									
			var elements = document.getElementsByTagName('section');	// Every section goes in the variable.
			for(var i in elements) {									// For every sections..
				if(elements[i].classList)								
					elements[i].classList.remove('active');				// .. the class 'active' is removed.
			}
			if(document.getElementById(id))
				document.getElementById(id).classList.add('active');    // The class 'active' is given to the element with the corresponding ID.
		},
		home: function(){
			Transparency.render(document.getElementById('home-page'), app.content.home, app.content.directives); // Displays the element with ID 'about-page' with the content from 'about'.
		},
		about: function(){
			Transparency.render(document.getElementById('about-page'), app.content.about, app.content.directives); // Displays the element with ID 'about-page' with the content from 'about'.
		},
		movies: function(filter) {		// Movies page function.

			var obj = JSON.parse(localStorage.getItem('movieData'));		// Parses the local JSON data.

			_.map(obj, function(movie) {												// Use underscore.js to map each value in a list..
				movie.reviews = _.reduce(movie.reviews, function(totalScore, review) {	// .. then combine those values..
					return totalScore + review.score; }, 0) / _.size(movie.reviews);		// .. and divide by total reviews to get the average review score.
			});
			switch(filter) {							// Checks what the filter is.
				case 'all':
					app.sections.toggle('movie-page');	// Resets all movies.
					break;
				case 'horror':
				case 'crime':
				case 'drama':
				case 'thriller':
				case 'action':
				case 'adventure':	
					obj = _.filter(obj, function(movie) { 							// Filters the obj..
						filter = filter.charAt(0).toUpperCase() + filter.slice(1);	// .. with the genre behind the hash 'movie'..
							return (_.contains(movie.genres, filter) === true); 	// .. and shows only movies with matching genre.
					});
					break;
				case 'asc':
					obj = _.sortBy(obj, function(movie) { 	
						return movie.reviews;				// Sort the movies based on their rating, ascending.
					});
					break;
				case 'desc':
					obj = _.sortBy(obj, function(movie) {
						return movie.reviews * -1;			// Sort the movies based on their rating, descending.
					});
					break;	
				case 'date-asc':
					obj = _.sortBy(obj, function(movie) {
						return Date.parse(movie.release_date); 			// Sort the movies based on their release date, ascending.
					});
					break;
				case 'date-desc':
					obj = _.sortBy(obj, function(movie) {
						return Date.parse(movie.release_date) * -1;		// Sort the movies based on their release date, descending.
					});
					break;
				default:
					// No valid filter.
					break;
				}

			Transparency.render(document.getElementById('movies'), obj, app.content.directives); 	// Displays the element with ID 'movies' with the content from 'obj'.
		},
		detail: function (movieTitle) {	// Detail page section.

			var obj = JSON.parse(localStorage.getItem('movieData'));		// Parses the local JSON data.

			var title = movieTitle;
			title = title.replace(/-/g, ' ');				// Replaces the dashes with spaces.
			title = title.replace(/\b./g, function(m) {		// Capitalize each word.
				return m.toUpperCase(); 
			});	

			obj = _.filter(obj, function(movie) { 		// Filters the obj..
					return movie.title === title; 		// .. and shows only movies with matching title.
			});

			_.map(obj, function(movie) {												// Use underscore.js to map each value in a list..
				movie.reviews = _.reduce(movie.reviews, function(totalScore, review) {	// .. then combine those values..
					return totalScore + review.score; }, 0) / _.size(movie.reviews);		// .. and divide by total reviews to get the average review score.
			});

			_.map(obj, function(movie) {
				movie.genres = movie.genres.toString();		// Transforms the genre array to a string.
			});


			Transparency.render(document.getElementById('detail'), obj, app.content.directives);	// Displays the element with ID 'detail' with the content from 'obj'.
			
			document.getElementById('menu-back').classList.remove('hidden'); // Adds a back button to the nav.
		}
	};

	app.gestures = {		// Gestures function.
		init: function() {
			document.getElementById('genre').onclick = function() {
				app.gestures.listToggle('genre');
			}

			document.getElementById('date').onclick = function() {
				app.gestures.listToggle('date');
			}

			document.getElementById('rating').onclick = function() {
				app.gestures.listToggle('rating');
			}

			document.getElementById('menu-about').onclick = function() {
				app.gestures.menuToggle('menu-about');
			}

			document.getElementById('menu-movies').onclick = function() {
				app.gestures.menuToggle('menu-movies');
			}

			document.getElementById('menu-home').onclick = function() {
				app.gestures.menuToggle('menu-home');
			}

			document.getElementById('menu-back').onclick = function() {
				app.gestures.menuToggle('menu-back');
			}

			var element = document.getElementById('home-page');									// Gets the body and puts it in variable element
			var hammertime = Hammer(element).on('pan', function(event) {	// Registers pan on the body
				var moveX = event.deltaX / 10;								// Gets the amount you pan on the X-axis
				var moveY = event.deltaY / 10;								// Gets the amount you pan on the Y-axis
				var rotate = 'rotate3d(' + moveY + ',' + moveX + ',2,' + event.distance + 'deg)';	// Adds the variables moveY and moveX to a rotate variable.
				document.getElementById('cup-container').style.transform = rotate;					// Adds that variable to the cup-container transform property.
			});
		},
		listToggle: function(id) {		// List toggle section								
			if(document.getElementById(id).classList.contains('active')) {	// If the element has a class 'active'..
				document.getElementById(id).classList.remove('active'); 	// .. it removes that class.
			} else {
				var listElements = document.getElementsByTagName('ul');		// If it doesn't have class 'active', get all uls.
				for(var i in listElements) {								// For every ul..
					if(listElements[i].classList)							
						listElements[i].classList.remove('active');			// .. remove the class 'active'
				}
				if(document.getElementById(id))
				document.getElementById(id).classList.add('active');		// Adds the class 'active' to the clicked element.
			}
		},
		menuToggle: function(id) {		// Menu toggle section
			var menuItems = document.getElementsByTagName('li');			// Gets all the lis.
			for(var i in menuItems) {										// For every li..
				if(menuItems[i].classList)							
					menuItems[i].classList.remove('current');				// .. remove the class 'current' 
			}
			if(document.getElementById(id))
				document.getElementById(id).classList.add('current');		// Adds the class 'current' to the clicked element.
				document.getElementById('menu-back').classList.add('hidden');	// Adds class 'hidden' to the back button, making it disappear.
		}
	};

	app.controller.init(); // Calls the controller init function > Gets the ball rolling
})(); // Ending the Immediately Invoked Function Expression (IIFE) / Self Invoking Anonymous Function