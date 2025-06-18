
function serializeGameData() {
	
}

function parseGameData(data) {
	
}

function saveGameData() {
	localStorage.setItem("save", serializeGameData());
}

function loadGameData() {
	if (localStorage.getItem("save") === null) return;
	parseGameData(localStorage.getItem("save"));
}

function clearGameData() {
	localStorage.clear();
}

addEventListener("pagehide", saveGameData);
addEventListener("visibilitychange", (event) => {
	if (event.visibilityState == "hidden") saveGameData();
});

loadGameData();
