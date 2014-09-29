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

   		 		'movies': function() {
   		 			app.sections.toggle('movie-page');	
    			}
});
		}
	};

	app.sections = {				// Sections funtion
		init: function(){
			this.about();			// Starts the about function
			this.movies();			// Starts the movies function
		},
		toggle: function(id){											// The function uses the div ID given by the app.sections.toggle in routie									
			var elements = document.getElementsByTagName('section');	// Every section goes in the variable
			for(var i in elements){										// For every sections..
				if(elements[i].classList)								
					elements[i].classList.remove('active');				// .. the class 'active' is removed
			}
			if(document.getElementById(id))
				document.getElementById(id).classList.add('active');    // The class 'active' is given to the tag with the corresponding ID
		},
		about: function(){
			Transparency.render(document.getElementById('about-page'), app.content.about, app.content.directives); // Displays the tag with ID 'about-page' with the content from 'about'
		},
		movies: function(){
			if(localStorage.getItem('moviesdas')){
				Transparency.render(document.getElementById('movie-page'), JSON.parse(localStorage.getItem('movies')), app.content.directives);
			}
			else {
				app.content.xhr.trigger('GET', 'http://dennistel.nl/movies', function(res){
						localStorage.setItem('movies', res);
						Transparency.render(document.getElementById('movie-page'), JSON.parse(res), app.content.directives);
					});
			}
		}
	};

	app.controller.init(); // Calls the controller init function > Gets the ball rolling
})(); // Ending the Immediately Invoked Function Expression (IIFE) / Self Invoking Anonymous Function