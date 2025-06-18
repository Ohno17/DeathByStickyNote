
const technologies = {
	news: false,
	autosupplier: false,
	massivestickynotemachine: false,
	columntwo: false,
	columnthree: false,
	assets: false,
	representatives: false,
	machinemachine: false
};

const activenews = [];
const activecontracts = [];
const activerepresentatives = {};

var autosupplierstate = "OFF";
var autoactivaterepresentatives = false;

var stickynotesmade = 0;
var stickynotesstored = 0;

var funds = 0;
var fundmultiplier = 1;
var paper = 1000;
var adhesive = 1000;
var stickynotemachine = 0;
var massivestickynotemachine = 0;

var paperperbuy = 1000;
var adhesiveperbuy = 50;

var papercost = 10;
var adhesivecost = 5;
var marketingcost = 100;
var stickynotemachinecost = 100;
var massivestickynotemachinecost = 500;
var stickynotemachineefficiency = 1;

var stickynoteprice = 0.75;
var marketing = 1;
var profit = 0;
var demand = 0;
var bonusdemand = 0;

var publicperceptionpoints = 10;
var publicperceptiongoal = 0;
var spread = 0;
var reach = 0;
var power = 0;
var votes = 0;

var equity = 0;

var publicbuyinterval = -1;
var inflationinterval = -1;
var profitinterval = -1; var oldfunds = funds;
var stickynotemachineinterval = -1;
var voteinterval = -1;
var representativesinterval = -1;
var assetsInterval = -1;

calculateDemand();
updateDisplay();
setProfitInterval();
setBuyingInterval();

setActiveContract(contracts[0]);
setActiveContract(contracts[0]);

function stickynoteMade() {
	if (technologies.columntwo && stickynotesmade >= publicperceptiongoal) {
		publicPerceptionGoalMet();
	}
}

function initColumnTwo() {
	spread = 1;
	reach = 1;
	publicperceptiongoal = Math.ceil(stickynotesmade * 1.2);
	setVotesInterval();
	unlockTechnology("columntwo");
}

function unlockTechnology(id) {
	document.getElementById(id).setAttribute("data-unlocked", "true");
	technologies[id] = true;
	updateDisplay();
}

function produceStickynote() {
	if (paper > 0 && adhesive > 0) {
		stickynotesmade++;
		stickynotesstored++;
		paper--;
		adhesive--;
		stickynoteMade();
		updateDisplay();
	} else if (autosupplierstate == "ON") {
		if (paper <= 0) purchasePaper();
		if (adhesive <= 0) purchaseAdhesive();
	}
}

function cost(number) {
	if (funds >= number) {
		funds -= number;
		return true;
	}
	return false;
}

function purchaseSpread() {
	if (publicperceptionpoints > 0) {
		spread++;
		publicperceptionpoints--;
		setVotesInterval();
		updateDisplay();
		updatePowerButtons();
	}
}

function purchaseReach() {
	if (publicperceptionpoints > 0) {
		reach++;
		publicperceptionpoints--;
		setVotesInterval();
		updateDisplay();
		updatePowerButtons();
	}
}

function purchasePaper() {
	if (cost(papercost)) {
		paper += paperperbuy;
		inflateResourceCosts();
		updateDisplay();
	}
}

function purchaseAdhesive() {
	if (cost(adhesivecost)) {
		adhesive += adhesiveperbuy;
		updateDisplay();
	}
}

function purchaseStickyNoteMachine() {
	if (cost(stickynotemachinecost)) {
		stickynotemachine++;

		if (stickynotemachine === 1 && marketing === 1) {
			initColumnTwo();
		}

		stickynotemachinecost = stickynotemachine * 150;
		setStickynoteMachineInterval();
		updateDisplay();
	}
}

function purchaseMassiveStickyNoteMachine() {
	if (cost(massivestickynotemachinecost)) {
		massivestickynotemachine++;

		massivestickynotemachinecost = massivestickynotemachine * 1500;
		setStickynoteMachineInterval();
		updateDisplay();
	}
}

function improveMarketing() {
	if (cost(marketingcost)) {
		marketing++;

		if (marketing === 2 && stickynotemachine === 0) {
			initColumnTwo();
		}

		marketingcost = marketing * 103;
		calculateDemand();
		setBuyingInterval();
		updateDisplay();
	}
}

function inflateResourceCosts() {
	papercost += Math.round((Math.random() - 0.4) * 7);
	adhesivecost += Math.round((Math.random() - 0.4) * 4);

	papercost = Math.max(5, Math.min(papercost, 30));
	adhesivecost = Math.max(15, Math.min(adhesivecost, 40));
}

function publicBuyStickynotes() {
	if (stickynotesstored > 0) {
		stickynotesstored--;
		funds += stickynoteprice * fundmultiplier;
		updateDisplay();
	}
}

function calculateProfit() {
	profit = funds - oldfunds;
	oldfunds = funds;
	updateDisplay();
}

function stickynoteMachineTick() {
	if (paper > 0 && adhesive > 0) {
		paper--;
		adhesive--;
		stickynotesstored += stickynotemachineefficiency;
		stickynotesmade += stickynotemachineefficiency;
		stickynoteMade();
		updateDisplay();
	} else if (autosupplierstate == "ON") {
		if (paper <= 0) purchasePaper();
		if (adhesive <= 0) purchaseAdhesive();
	}
}

function createVotesGain() {
	if (votes < reach * 1000) {
		votes++;
	} else {
		power += 0.2;
	}
	updateDisplay();
}

function chargeRepresentatives() {
	const keys = Object.keys(activerepresentatives);
	for (var i = 0; i < keys.length; i++) {
		if (activerepresentatives[keys[i]].charge < representatives[keys[i]].requirement) {
			activerepresentatives[keys[i]].charge++;
			updateRepresentativesDisplay(keys[i]);
		} else if (autoactivaterepresentatives) {
			representatives[keys[i]].effect();
			activerepresentatives[keys[i]].charge = 0;
		}
	}
}

function inflateAssets() {
	equity *= 1 + (Math.random() * 0.03);
	updateDisplay();
	updateAssetsDisplay();
}

function calculatePowerIntervalDelay(number) {
	return 1000 / number;
}

function calculateBuyingIntervalDelay(number) {
	return (100 / number) * 80;
}

function calculateMachineIntervalDelay(lightnumber, heavynumber) {
	const delay = 1500 / (lightnumber + (heavynumber * 10));
	return delay;
}

function setStickynoteMachineInterval() {
	deleteInterval(stickynotemachineinterval);
	stickynotemachineinterval = createInterval(stickynoteMachineTick, calculateMachineIntervalDelay(stickynotemachine, massivestickynotemachine));
}

function setBuyingInterval() {
	deleteInterval(publicbuyinterval);
	publicbuyinterval = createInterval(publicBuyStickynotes, calculateBuyingIntervalDelay(demand));
}

function setProfitInterval() {
	deleteInterval(profitinterval);
	profitinterval = createInterval(calculateProfit, 1000);
}

function setVotesInterval() {
	deleteInterval(voteinterval);
	voteinterval = createInterval(createVotesGain, calculatePowerIntervalDelay(spread));
}

function setRepresentativesInterval() {
	deleteInterval(representativesinterval);
	representativesinterval = createInterval(chargeRepresentatives, 50);
}

function setAssetsInterval() {
	deleteInterval(assetsInterval);
	assetsInterval = createInterval(inflateAssets, 800);
}

function toggleAutoSupplier() {
	autosupplierstate = autosupplierstate == "OFF" ? "ON" : "OFF";
	specialdisplay.autosupplierstate.innerHTML = autosupplierstate;
}

function changeStickynotePrice(amount) {
	stickynoteprice += amount;
	if (stickynoteprice < 0.01) {
		stickynoteprice = 0.01;
	} else if (stickynoteprice > 6) {
		stickynoteprice = 6;
	}
	calculateDemand();
	updateDisplay();
	setBuyingInterval();
}

function calculateDemand() {
	demand = (1 / stickynoteprice) * marketing * 1.25525124;
	demand += 10 / stickynoteprice;
	demand += bonusdemand;
}

function addRandomRepresentative() {
	const repkeys = Object.keys(representatives);
	let chosenrep = repkeys[Math.floor(Math.random() * repkeys.length)];

	while (activerepresentatives[chosenrep]) {
		chosenrep = repkeys[Math.floor(Math.random() * repkeys.length)];
	}
	
	activerepresentatives[chosenrep] = {
		charge: 0
	};
	
	displayRepresentative(chosenrep, representatives[chosenrep], activerepresentatives[chosenrep]);
}

function activateRepresentative(event) {
	const repkey = event.currentTarget.getAttribute("data-representativename");
	const rep = activerepresentatives[repkey];

	if (rep.charge >= representatives[repkey].requirement) {
		representatives[repkey].effect();
		rep.charge = 0;
	}
}

function contractCostsMet(contract) {
	const cost = contract.cost;
	return (cost.stickynotes <= stickynotesstored) &&
		(cost.funds <= funds) &&
		(cost.paper <= paper) &&
		(cost.adhesive <= adhesive) &&
		(cost.power <= power) &&
		(cost.spread <= spread) &&
		(cost.reach <= reach) &&
		(cost.votes <= votes);
}

function contractCostsApply(contract) {
	const cost = contract.cost;

	stickynotesstored -= cost.stickynotes;
	funds -= cost.funds;
	paper -= cost.paper;
	adhesive -= cost.adhesive;
	power -= cost.power;
	spread -= cost.spread;
	reach -= cost.reach;
	votes -= cost.votes;
}

function setActiveContract(contract) {
	const contractindex = contracts.indexOf(contract);
	contracts.splice(contractindex, 1);

	activecontracts.push(contract);
	displayContract(contract, activecontracts.indexOf(contract));
}

function finishContract(event) {
	const contract = activecontracts.find((contract) => contract.name == event.currentTarget.getAttribute("data-contractname"));
	
	if (contractCostsMet(contract)) {
		contractCostsApply(contract);
		
		contract.effect();

		activecontracts.splice(activecontracts.indexOf(contract), 1);
		event.currentTarget.remove();
		
		contracts.push(...contract.unlocks);
		for (var i = 0; i < contracts.length; i++) {
			setActiveContract(contracts[0]);
		}
	} else {
		alert("Cannot finish this contract!");
	}
}

function registerNewsPoints(points) {
	bonusdemand += points * 2;
	calculateDemand();
	setBuyingInterval();
	updateDisplay();
}

function publicPerceptionGoalMet() {
	publicperceptiongoal = Math.ceil(stickynotesmade * 1.5);
	publicperceptionpoints++;
	updatePowerButtons();
}

function investAssets() {
	const amountToInvest = funds / 2;
	funds -= amountToInvest;
	equity += amountToInvest;
	updateDisplay();
}

function liquidateAssets() {
	funds += equity;
	equity = 0;
	updateDisplay();
}
