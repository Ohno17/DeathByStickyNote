const representatives = {
	lizardpeople: {
		name: "The Lizard People",
		desc: "How does a lizard tie its shoes? With its hands.",
		effect: function () {
			fundmultiplier = 2.5;
			setTimeout(function () {
				fundmultiplier = 1;
			}, 2000);
		},
		requirement: 200
	},
	hivemind: {
		name: "The Hivemind",
		desc: "53,647 for the price of one.",
		effect: function () {
			marketing += 100;
			calculateDemand();
			updateDisplay();
			setTimeout(function () {
				marketing -= 100;
				calculateDemand();
				updateDisplay();
			}, 3000);
		},
		requirement: 200
	},
	brad: {
		name: "Brad",
		desc: "Green is the best color.",
		effect: function () {
			power += 100;
			updateDisplay();
		},
		requirement: 500
	},
	imaginary: {
		name: "Imaginary Friend",
		desc: "But an illusion.",
		effect: function () {
			paper += 1000;
			adhesive += 100;
			updateDisplay();
		},
		requirement: 300
	},
	reporters: {
		name: "Newspaper Man",
		desc: "He's all grown up.",
		effect: function () {
			createNews();
		},
		requirement: 700
	},
	energizer: {
		name: "Energozier",
		desc: "Reduces preformance task proficiency.",
		effect: function () {
			for (repkey in activerepresentatives) {
				activerepresentatives[repkey].charge += 100;
			} 
		},
		requirement: 300
	}
};
