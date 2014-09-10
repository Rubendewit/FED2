var app = app || {};

(function(){

	app.controller = {
		init: function(){
			app.debug.init();
			app.gps.init();
			app.map.init();
			app.tour.init();			
		}
	}

	app.gps = {
		init: function(){
			//
			console.log("GPS is available");
		}
	}

	app.map = {
		init: function(){
			//
			console.log("Map is ready");
		}
	}

	app.tour = {
		init: function(){
			//
			console.log("Tour loaded");
		}
	}

	app.debug = {
		init: function(){
			//
			console.log("Debug initialized");
		}
	}

	app.controller.init();

})();