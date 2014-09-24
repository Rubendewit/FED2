var app = app || {};

(function(){

	app.content = {
		about: {
			title: 'About this app',
			description: '<p>Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let\'s get him some rocks. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. bruce... i\'m god. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can\'t now, being dead and all. rehabilitated? well, now let me see. you know, i don\'t have any idea what that means. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. rehabilitated? well, now let me see. you know, i don\'t have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can\'t now, being dead and all. </p>'
						  + '<p>I did the same thing to gandhi, he didn\'t eat for three weeks. bruce... i\'m god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i\'m god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn\'t eat for three weeks.</p>'
						  + '<p>Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy.</p>'
						  + '<p>That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn\'t eat for three weeks. the man likes to play chess; let\'s get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. i don\'t think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world. </p>'
		},

		movies: {
			title: 'My favorite movies',
			summary:
				[{
					title: 'Shawshank Redemption',
					releaseDate: '14 October 1994',
					description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
					cover: 'img/shawshank-redemption.jpg'
				},
				{
					title: 'The Godfather',
					releaseDate: '24 March 1972',
					description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
					cover: 'img/the-godfather.jpg'
				},
				{
					title: 'Pulp Fiction',
					releaseDate: '14 October 1994',
					description: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
					cover: 'img/pulp-fiction.jpg'
				},
				{
					title: 'The Dark Knight',
					releaseDate: '18 July 2008',
					description: 'When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level.',
					cover: 'img/the-dark-knight.jpg'
				}]
	},

	directives: {

		description: {
			html: function(params) {
				return params.value + this.description;
			}
		},

  		summary: {
  			image: {
    			src: function(params) {
      				return "static/" + this.cover;
    			}
  			}
  		}
	}
};

})();