
function generateRepresentativeContracts() {
	function createRepContract(number) {
		return {
			name: "Representative " + number,
			desc: "This organism contains " + Math.ceil(2.457 * number) + " bananas. Stay cautious.",
			effect: function () {
				if (number == 1) specialdisplay.represenatives.textContent = "";
				addRandomRepresentative();
			},
			cost: {
				funds: 0,
				stickynotes: 0,
				paper: 0,
				adhesive: 0,
				power: 0,
				spread: 0,
				reach: 0,
				votes: 500 * number
			},
			unlocks: []
		};
	}
	
	var rootRep = createRepContract(1);
	var lastRep = createRepContract(2);
	rootRep.unlocks.push(lastRep);

	for (var i = 3; i < Object.keys(representatives).length + 1; i++) {
		var newRep = createRepContract(i);
		lastRep.unlocks.push(newRep);
		lastRep = newRep;
	}

	return rootRep;
}

const contracts = [
	{
		name: "Over Advertisements",
		desc: "Over your head. Increase demand by 50%.",
		effect: function () {
			bonusdemand += 50;
			calculateDemand();
			setBuyingInterval();
			updateDisplay();
		},
		cost: {
			funds: 0,
			stickynotes: 0,
			paper: 0,
			adhesive: 0,
			power: 0,
			spread: 0,
			reach: 0,
			votes: 300
		},
		unlocks: [
			{
				name: "Auto Supplier",
				desc: "Automate automating automation. Automatically buy paper or adhesive when they run out.",
				effect: function () {
					unlockTechnology("autosupplier");
				},
				cost: {
					funds: 0,
					stickynotes: 0,
					paper: 0,
					adhesive: 0,
					power: 100,
					spread: 0,
					reach: 0,
					votes: 2000
				},
				unlocks: [
					{
						name: "Concentrated Stickyness",
						desc: "Adhesive bottles now have 200% more liters per liter.",
						effect: function () {
							adhesiveperbuy = 150;
						},
						cost: {
							funds: 0,
							stickynotes: 0,
							paper: 0,
							adhesive: 0,
							power: 0,
							spread: 0,
							reach: 0,
							votes: 1000
						},
						unlocks: [
							{
								name: "Concentrated Stickyness II",
								desc: "Adhesive bottles now have 100% more than 200% more liters per liter.",
								effect: function () {
									adhesiveperbuy = 300;
								},
								cost: {
									funds: 0,
									stickynotes: 0,
									paper: 0,
									adhesive: 0,
									power: 0,
									spread: 0,
									reach: 0,
									votes: 2000
								},
								unlocks: []
							}
						]
					}
				]
			},
			{
				name: "Massive Sticky Note Machines",
				desc: "\"Machines take me by surprise with great frequency.\" - Alan Turing",
				effect: function () {
					unlockTechnology("massivestickynotemachine");
				},
				cost: {
					funds: 0,
					stickynotes: 0,
					paper: 0,
					adhesive: 0,
					power: 0,
					spread: 0,
					reach: 0,
					votes: 1000
				},
				unlocks: [
					{
						name: "Representation",
						desc: "The reptilian people just wanted to make sticky notes after all.",
						effect: function () {
							unlockTechnology("representatives");
							setRepresentativesInterval();
						},
						cost: {
							funds: 0,
							stickynotes: 0,
							paper: 0,
							adhesive: 0,
							power: 200,
							spread: 0,
							reach: 0,
							votes: 2100
						},
						unlocks: [
							generateRepresentativeContracts(),
							{
								name: "Managerial Weaponry",
								desc: "Representatives do the thing.",
								effect: function () {
									autoactivaterepresentatives = true;
								},
								cost: {
									funds: 500,
									stickynotes: 0,
									paper: 0,
									adhesive: 0,
									power: 0,
									spread: 0,
									reach: 0,
									votes: 1000
								},
								unlocks: []
							}
						]
					}
				]
			},
			{
				name: "Mechanical Efficiency A",
				desc: "\"It is only when they go wrong that machines remind you how powerful they are.\" - Clive James",
				effect: function () {
					stickynotemachineefficiency *= 2;
				},
				cost: {
					funds: 0,
					stickynotes: 0,
					paper: 1000,
					adhesive: 100,
					power: 100,
					spread: 0,
					reach: 0,
					votes: 0
				},
				unlocks: []
			}
		]
	},
	{
		name: "Sticky News",
		desc: "A magical land of information at your fingertips, where nothing bad ever happens.",
		effect: function () {
			unlockTechnology("news");
			createNews();
		},
		cost: {
			funds: 0,
			stickynotes: 500,
			paper: 1000,
			adhesive: 50,
			power: 0,
			spread: 0,
			reach: 0,
			votes: 0
		},
		unlocks: [
			{
				name: "Assets",
				desc: "Accumulate equity over time.",
				effect: function () {
					setAssetsInterval();
					unlockTechnology("columnthree");
					unlockTechnology("assets");
				},
				cost: {
					funds: 100,
					stickynotes: 0,
					paper: 0,
					adhesive: 0,
					power: 100,
					spread: 0,
					reach: 0,
					votes: 1000
				},
				unlocks: []
			},
			{
				name: "Mechanical Efficiency B",
				desc: "Machine efficiency x2.",
				effect: function () {
					stickynotemachineefficiency *= 2;
				},
				cost: {
					funds: 0,
					stickynotes: 0,
					paper: 1000,
					adhesive: 100,
					power: 100,
					spread: 0,
					reach: 0,
					votes: 0
				},
				unlocks: []
			}
		]
	}
];
