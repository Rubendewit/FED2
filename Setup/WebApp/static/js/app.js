var app = app || {};

(function(){

	app.controller = {
		init: function(){
			app.router.init();					
		}
	}

	app.router = {
		init: function(){
			//
			console.log("Router standby!");
			routie({
				'about': function() {
					//
					app.router.render('aboutpage');
				},
				'movies': function() {
					//
					console.log("Mooooovies.");
				}
			});
		},
		render: function(page){
			if(page == "aboutpage"){
				Transparency.render(document.getElementById('aboutpage'), app.content.about);
			}
		}
	}

	app.content = {
		about : {
			title: "about",
			description: "dit is about"
		}
	}

	

	// app.about = {
	// 	init: function(){
	// 		//
	// 		console.log("Welkom to the aboot!");
	// 	}
	// }

	// app.movies = {
	// 	init: function(){
	// 		//
	// 		console.log("Mooooovies.");
	// 	}

	app.controller.init();

})();