var app = app || {};

(function(){

	// document.getElementById('genre').onclick = function() {
	// 	app.functions.listToggle('genre');
	// }
	// document.getElementById('date').onclick = function() {
	// 	app.functions.listToggle('date');
	// }
	// document.getElementById('rating').onclick = function() {
	// 	app.functions.listToggle('rating');
	// }

	document.getElementById('menu-about').onclick = function() {
		app.functions.menuToggle('nav-about');
	}
	document.getElementById('menu-movies').onclick = function() {
		app.functions.menuToggle('menu-movies');
	}
	document.getElementById('menu-home').onclick = function() {
		app.functions.menuToggle('menu-home');
	}
	document.getElementById('menu-back').onclick = function() {
		app.functions.menuToggle('menu-movies');
	}

	app.functions = {
		listToggle: function(id) {										
			if(document.getElementById(id).classList.contains('active')) {
				document.getElementById(id).classList.remove('active'); 
			} else {
				var listElements = document.getElementsByTagName('ul');
				for(var i in listElements) {								
					if(listElements[i].classList)							
						listElements[i].classList.remove('active');			
				}
				if(document.getElementById(id))
				document.getElementById(id).classList.add('active');
			}
		},
		menuToggle: function(id) {
			var menuItems = document.getElementsByTagName('li');
			for(var i in menuItems) {								
				if(menuItems[i].classList)							
					menuItems[i].classList.remove('current');			
			}
			if(document.getElementById(id))
				document.getElementById(id).classList.add('current');
				document.getElementById('menu-back').classList.add('hidden');
		}
	};

}());