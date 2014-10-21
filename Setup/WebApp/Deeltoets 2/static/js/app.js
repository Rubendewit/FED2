var app = app || {};

(function(){
	app.controller = { 				// Controller function, starts the rest of the function.
		init: function(){
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

    			'movies/?:genre': function(genre){		// If there is a genre behind the hash 'movie', it will only show movies with that genre.
			    	app.sections.movies(app.xhr.getItem('movieData'), genre);
			    }

			    // 'movie/?:id': function( id ) {
			    // 	app.sections.detailMovie( app.xhr.getLocal('movieData'), id );
			    // }
			});
		}
	};

	app.sections = {				// Sections function
		init: function(){
			
			data = app.xhr.getItem('movieData'); 	// Fetches local data
			if(data == null) {						// If there is no local data..										
				app.content.xhr.trigger('GET', 'http://dennistel.nl/movies', app.xhr.setItem, this.movies);	// .. it fetches the movie data from the site. On success, save the data locally.
			} else {								// If there IS local data..
				this.movies(data);					// .. use that, and go to app.sections.movies.
			}

			this.about();			// Starts the about function
		},
		toggle: function(id){											// The function uses the div ID given by the app.sections.toggle in routie									
			var elements = document.getElementsByTagName('section');	// Every section goes in the variable
			for(var i in elements){										// For every sections..
				if(elements[i].classList)								
					elements[i].classList.remove('active');				// .. the class 'active' is removed
			}
			if(document.getElementById(id))
				document.getElementById(id).classList.add('active');    // The class 'active' is given to the element with the corresponding ID
		},
		about: function(){
			Transparency.render(document.getElementById('about-page'), app.content.about, app.content.directives); // Displays the element with ID 'about-page' with the content from 'about'.
		},
		movies: function(obj, filter){

			obj = JSON.parse(obj);

			_.map(obj,  function(movie){												// Use underscore.js to map each value in a list..
				movie.reviews = _.reduce(movie.reviews, function(totalScore, review){	// .. then combine those values..
					return totalScore + review.score; }, 0) / movie.reviews.length;		// .. and divide by total reviews to get the average review score.
			});

			if(filter) {
				if(filter == 'all') {
   		 			app.sections.toggle('movie-page');   		 			
				} else {
					obj = _.filter( obj, function(movie){ 							// Filters the obj..
						filter = filter.charAt(0).toUpperCase() + filter.slice(1);	// .. with the genre behind the hash 'movie'..
							return (_.contains(movie.genres, filter) == true); 		// .. and shows only movies with matching genre.
					});
				}
			};

			Transparency.render(document.getElementById('movies'), obj, app.content.directives); // Displays the element with ID 'movies' with the content from 'obj'.
		}
	};

	app.controller.init(); // Calls the controller init function > Gets the ball rolling
})(); // Ending the Immediately Invoked Function Expression (IIFE) / Self Invoking Anonymous Function