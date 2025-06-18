
const settingsDialog = document.getElementById("settings");

const darkmodeCheckbox = document.getElementById("darkmode");
darkmodeCheckbox.checked = document.documentElement.className.includes("dark");

function openSettings() {
	settingsDialog.showModal();
}

function closeSettings() {
	settingsDialog.close();
}

function toggleDarkmode(checkbox) {
	if (checkbox.checked) document.documentElement.className = "dark";
	else document.documentElement.className = "light";
}
