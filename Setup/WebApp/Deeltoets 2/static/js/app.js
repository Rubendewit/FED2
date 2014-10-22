var app = app || {};

(function(){
	app.controller = { 				// Controller function, starts the rest of the function.
		init: function() {
			app.sections.init(); 	// Starts the section init
			app.router.init(); 		// Starts the router init
		}
	};

	app.router = {										// Router function
		init: function(){
			routie({ 									// Routie looks at the # in the URL
    			'about': function() {					// If 'about' is after the # then..
    				app.sections.toggle('about-page');  // .. the 'about-page' section becomes visible
    			},
   		 		'movies': function() {					// Same here, except if 'movies' is after the #
   		 			app.sections.toggle('movie-page');	
    			},
    			'movies/genre/?:genre': function(genre) {		// If there is a genre behind the hash 'movie/genre', it will only show movies with that genre.
			    	app.sections.movies(app.xhr.getItem('movieData'), genre);
			    },
			    'movies/rating/?:order': function(order) {		// If there is an order behind the hash 'movie/rating', it will show movies based on their rating.
			    	app.sections.movies(app.xhr.getItem('movieData'), order);
			    },
			    'movies/date/?:order': function(order) {			// If there is an order behind the hash 'movie/date', it will show movies based on their release date.
			    	app.sections.movies(app.xhr.getItem('movieData'), order);
			    },
			    'movie/:ID': function(ID) {
			    	app.sections.toggle('detail-page');	
			    	app.sections.detail(app.xhr.getItem('movieData'), ID);
			    }
			});
		}
	};

	app.sections = {				// Sections function
		init: function() {
			
			data = app.xhr.getItem('movieData'); 	// Fetches local data
			if(data == null) {						// If there is no local data..										
				app.content.xhr.trigger('GET', 'http://dennistel.nl/movies', app.xhr.setItem, this.movies);	// .. it fetches the movie data from the site. On success, save the data locally.
			} else {								// If there IS local data..
				this.movies(data);					// .. use that, and go to app.sections.movies
			}

			this.about();			// Starts the about function
		},
		toggle: function(id) {											// The function uses the div ID given by the app.sections.toggle in routie									
			var elements = document.getElementsByTagName('section');	// Every section goes in the variable
			for(var i in elements) {									// For every sections..
				if(elements[i].classList)								
					elements[i].classList.remove('active');				// .. the class 'active' is removed
			}
			if(document.getElementById(id))
				document.getElementById(id).classList.add('active');    // The class 'active' is given to the element with the corresponding ID
		},
		about: function(){
			Transparency.render(document.getElementById('about-page'), app.content.about, app.content.directives); // Displays the element with ID 'about-page' with the content from 'about'.
		},
		movies: function(obj, filter) {

			obj = JSON.parse(obj);

			_.map(obj, function(movie) {												// Use underscore.js to map each value in a list..
				movie.reviews = _.reduce(movie.reviews, function(totalScore, review) {	// .. then combine those values..
					return totalScore + review.score; }, 0) / movie.reviews.length;		// .. and divide by total reviews to get the average review score.
			});
			switch(filter) {							// Checks what the filter is.
				case 'all':
					app.sections.toggle('movie-page');	// Resets all movies.
					break;
				case 'horror':
				case 'crime':
				case 'drama':
				case 'thriller':	
					obj = _.filter(obj, function(movie) { 							// Filters the obj..
						filter = filter.charAt(0).toUpperCase() + filter.slice(1);	// .. with the genre behind the hash 'movie'..
							return (_.contains(movie.genres, filter) == true); 		// .. and shows only movies with matching genre.
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
					// No valid filter
					break;
				}

			Transparency.render(document.getElementById('movies'), obj, app.content.directives); 	// Displays the element with ID 'movies' with the content from 'obj'.
		},
		detail: function (obj, movieId) {		// Detail page section

			obj = JSON.parse(obj);		

			_.map(obj, function(movie) {												// Use underscore.js to map each value in a list..
				movie.reviews = _.reduce(movie.reviews, function(totalScore, review) {	// .. then combine those values..
					return totalScore + review.score; }, 0) / movie.reviews.length;		// .. and divide by total reviews to get the average review score.
			});
			
			_.map(obj, function(movie) {
				movie.genres = movie.genres.toString();		// Transforms the genre array to a string
			});

			movieId = parseInt(movieId) - 1;				// Parses the movieId to an integer, and making it compatible with array numbers.	
			obj = obj[movieId];								// Uses the movieId to show the right movie.

			Transparency.render(document.getElementById('detail'), obj, app.content.directives);	// Displays the element with ID 'detail' with the content from 'obj'.
		}
	};

	app.controller.init(); // Calls the controller init function > Gets the ball rolling
})(); // Ending the Immediately Invoked Function Expression (IIFE) / Self Invoking Anonymous Function