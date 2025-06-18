
const specialdisplay = {
	news: document.getElementById("newsarticles"),
	contracts: document.getElementById("contracts"),
	represenatives: document.getElementById("reps"),
	autosupplierstate: document.getElementById("purchaseass"),
	votespercent: document.getElementById("displayvotesbar"),
	realreach: document.getElementById("displayrealreach"),
	invest: document.getElementById("displayinvest"),
	stickynotesmade: document.getElementById("displayproduced"),
	spreadbutton: document.getElementById("spreadbutton"),
	reachbutton: document.getElementById("reachbutton"),
	assetsctx: document.getElementById("assetsgraph").getContext("2d")
};

const display = {
	stickynoteprice: document.getElementById("displaystickyprice"),
	profit: document.getElementById("displaypro"),
	funds: document.getElementById("displayfunds"),
	demand: document.getElementById("displaydemand"),
	stickynotesstored: document.getElementById("displaystored"),
	papercost: document.getElementById("purchasepc"),
	paper: document.getElementById("purchasepa"),
	adhesivecost: document.getElementById("purchaseac"),
	adhesive: document.getElementById("purchaseaa"),
	marketingcost: document.getElementById("purchasemc"),
	marketing: document.getElementById("purchasema"),
	stickynotemachine: document.getElementById("purchasesna"),
	stickynotemachinecost: document.getElementById("purchasesnc"),
	massivestickynotemachine: document.getElementById("purchasemsna"),
	massivestickynotemachinecost: document.getElementById("purchasemsnc"),
	publicperceptionpoints: document.getElementById("displaypppoints"),
	publicperceptiongoal: document.getElementById("displayppgoal"),
	spread: document.getElementById("displayspread"),
	reach: document.getElementById("displayreach"),
	power: document.getElementById("displaypower"),
	votes: document.getElementById("displayvotes"),
	equity: document.getElementById("displayequity")
};

function truncateExtraDigits(number) {
	return Math.round((number + Number.EPSILON) * 100) / 100;
}

function updatePowerButtons() {
	const disabled = publicperceptionpoints <= 0;
	spreadbutton.disabled = disabled;
	reachbutton.disabled = disabled;
}

function updateFinishableContracts() {
	for (var i = 0; i < specialdisplay.contracts.children.length; i++) {
		const contractelement = specialdisplay.contracts.children[i];
		const contract = activecontracts.find((contract) => contract.name == contractelement.getAttribute("data-contractname"));
		contractelement.disabled = !contractCostsMet(contract);
	}
}

function updateDisplay() {
	Object.keys(display).forEach(function(key) {
		display[key].innerHTML = truncateExtraDigits(window[key]);
	});

	specialdisplay.invest.innerHTML = truncateExtraDigits(funds / 2);
	specialdisplay.votespercent.value = votes / (reach == 0 ? 1 : reach * 1000);
	specialdisplay.realreach.innerHTML = reach * 1000;
	specialdisplay.stickynotesmade.innerHTML = stickynotesmade.toLocaleString();
	updateFinishableContracts();
}

function updateRepresentativesDisplay(repkey) {
	const activerep = activerepresentatives[repkey];
	
	activerep.progresselement.value = activerep.charge;
	activerep.buttonelement.disabled = representatives[repkey].requirement > activerep.charge;
}

function displayRepresentative(keyname, representative, activerepdata) {
	var displayedRepresentative = document.createElement("div");
	
	var representativeTitle = document.createElement("span");
	var representativeText = document.createElement("p");
	
	representativeTitle.appendChild(document.createTextNode(representative.name));
	representativeText.appendChild(representativeTitle);
	representativeText.appendChild(document.createTextNode("\""+representative.desc+"\""));

	activerepdata.progresselement = document.createElement("progress");
	activerepdata.progresselement.setAttribute("value", 0);
	activerepdata.progresselement.setAttribute("max", representative.requirement);
	activerepdata.buttonelement = document.createElement("button");

	activerepdata.buttonelement.appendChild(document.createTextNode("Stimulate"));
	activerepdata.buttonelement.setAttribute("data-representativename", keyname);
	activerepdata.buttonelement.addEventListener("click", activateRepresentative);

	displayedRepresentative.appendChild(representativeText);
	displayedRepresentative.appendChild(activerepdata.buttonelement);
	displayedRepresentative.appendChild(activerepdata.progresselement);
	
	specialdisplay.represenatives.appendChild(displayedRepresentative);
}

function displayContract(contract) {
	var displayedContract = document.createElement("button");
	
	var contractTitle = document.createElement("span");
	contractTitle.appendChild(document.createTextNode(contract.name));
	
	displayedContract.appendChild(contractTitle);

	var coststring = "";
	var currentsum = 0;
	var truesum = Object.values(contract.cost).reduce((a, b) => a + b, 0);

	Object.keys(contract.cost).forEach(function(key) {
		if (contract.cost[key] === 0) {
			return;
		}
		
		coststring += contract.cost[key] + " " + key;
		currentsum += contract.cost[key];
		if (currentsum < truesum) {
			coststring += ", ";
		}
	});
	
	displayedContract.appendChild(document.createTextNode(contract.desc + (coststring !== "" ? (" (" + coststring + ")") : "")));

	displayedContract.addEventListener("click", finishContract);
	displayedContract.setAttribute("data-contractname", contract.name);
	
	specialdisplay.contracts.appendChild(displayedContract);
	updateFinishableContracts();
}

function displayNews(articleindex) {
	const article = activenews[articleindex];
	
	var displayedNews = document.createElement("article");
	var articleHeader = document.createElement("hgroup");
	var newsContent = document.createElement("p");

	var newsTitle = document.createElement("h4");
	newsTitle.appendChild(document.createTextNode(article.title));
	articleHeader.appendChild(newsTitle);
	
	var newsAuthor = document.createElement("p");
	newsAuthor.appendChild(document.createTextNode(article.author));
	articleHeader.appendChild(newsAuthor);

	displayedNews.appendChild(articleHeader);
	
	for (var i = 0; i < article.sentences.length; i++) {
		var sentence = document.createElement("span");
		
		sentence.appendChild(document.createTextNode(article.sentences[i].text + " "));
		sentence.setAttribute("data-selected", article.sentences[i].selected);
		sentence.setAttribute("data-sentenceindex", i);
		sentence.addEventListener("click", toggleNewsSentence);
		
		newsContent.appendChild(sentence);
	}
	
	var newsSubmit = document.createElement("button");
	newsSubmit.appendChild(document.createTextNode("Send to press"));
	newsSubmit.addEventListener("click", submitNewsArticle);

	displayedNews.appendChild(newsContent);
	displayedNews.appendChild(newsSubmit);
	
	displayedNews.setAttribute("data-newsindex", articleindex);
	displayedNews.setAttribute("data-completed", false);

	specialdisplay.news.insertBefore(displayedNews, specialdisplay.news.firstChild);
}

let recentEquity = [];
function updateAssetsDisplay() {
	recentEquity.push(equity);
	if (recentEquity.length > 22) recentEquity.splice(0, 1);

	const ctx = specialdisplay.assetsctx;
	const shiftAmount = ctx.canvas.width / 20;

	let max = recentEquity[0];
	for (let i = 1; i < recentEquity.length; i++) {
		if (recentEquity[i] > max) max = recentEquity[i];
	}

	ctx.fillStyle = "black"
	ctx.strokeStyle = "white";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	let step = 1;
	ctx.beginPath();
	ctx.moveTo(ctx.canvas.width, (1 - (recentEquity[recentEquity.length - 1] / max)) * 150);
	for (let i = recentEquity.length - 2; i > 0; i--) {
		ctx.lineTo(ctx.canvas.width - (shiftAmount * step), (1 - (recentEquity[i] / max)) * 150);
		step++;
	}
	ctx.stroke();
	ctx.closePath();
}
