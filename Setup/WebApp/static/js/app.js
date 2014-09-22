var app = app || {};

(function(){
	app.controller = {
		init: function(){
			app.sections.init();
			app.router.init();
		}
	};

	app.router = {
		init: function(){
			routie({
    			'about': function() {
    				app.sections.toggle('about-page');
    			},

   		 		'movies': function() {
   		 			app.sections.toggle('movie-page');	
    			}
});
		}
	};

	app.sections = {
		init: function(){
			this.about();
			this.movies();
		},
		toggle: function(id){
			var elements = document.getElementsByTagName('section');
			for(var i in elements){
				if(elements[i].classList)
					elements[i].classList.remove('active');
			}
			if(document.getElementById(id))
				document.getElementById(id).classList.add('active');
		},
		about: function(){
			Transparency.render(document.getElementById('about-page'), app.content.about);
		},
		movies: function(){
			Transparency.render(document.getElementById('movie-page'), app.content.movies, directives);
		}
	}

	app.controller.init();
})();