var app = app || {};

(function(){

	app.content = {
		
		home: {
			title: 'Home',
			description: '<p>Welcome to the Movie App. Grab a cup o\' coffee, sit down and relax. Enjoy your stay.</p><p id="cup-container"><span class="flaticon-coffee68"></span></p><p>Spin me</p>'
		},

		about: {
			title: 'About this app',
			description: '<p>Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let\'s get him some rocks. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. bruce... i\'m god. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can\'t now, being dead and all. rehabilitated? well, now let me see. you know, i don\'t have any idea what that means. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. rehabilitated? well, now let me see. you know, i don\'t have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can\'t now, being dead and all. </p>'
						  + '<p>I did the same thing to gandhi, he didn\'t eat for three weeks. bruce... i\'m god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i\'m god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn\'t eat for three weeks.</p>'
						  + '<p>Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy.</p>'
						  + '<p>That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn\'t eat for three weeks. the man likes to play chess; let\'s get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. i don\'t think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world. </p>'
		},

	directives: {

		description: {
			html: function(params) {
				return params.value + this.description;
			}
		},

		cover: {
			src: function(params) {
				return this.cover;
			},

			alt: function(params) {
				return this.title;
			}
		},

			reviews: {
				text: function(){						
					if(isNaN(this.reviews)){
						return 'No score available';
					} else {
						return this.reviews;
					}
				}
			},

			link: {
				href : function(params) {
					var title = this.title.replace(/\s+/g, '-').toLowerCase();
					return '#movie/' + title;
				}
			}
		}
	};

	app.xhr = {
		trigger: function (type, url, success, data) {
			app.sections.toggle('loading');

			var req = new XMLHttpRequest;
			req.open(type, url, true);

			req.setRequestHeader('Content-type','application/json');

			type === 'POST' ? req.send(data) : req.send(null);

			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200 || req.status === 201) {
						success(req.responseText);
					}
				}
			}
		},

		loadItem: function(source, callback){
			if(window.navigator.onLine) {								
				app.xhr.trigger('GET', source, function(response) {
					localStorage.setItem('movieData', response);
					callback();
				});
			} else {
				if(localStorage.getItem('movieData'))
					callback();
			}
		},

		setItem: function(data) {
			localStorage.setItem('movieData', data);
		},

		getItem: function(name) {
			return localStorage.getItem(name);
		}

	};

})();