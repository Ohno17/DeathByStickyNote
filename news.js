
const newstitles = ["You WON'T BELIEVE THIS!", "Sticky notes and their BIG PROBLEM...", "Sticky notes!!11!", "lol theyar e sticky to wite notess", "FREE STICKY NOTES please plea plase read it"];

const newsauthors = ["Xx_STICKYNOTER_xX", "The Sticky Note Reviewer", "fuehiuhId", "S. N.", "username", "scambot-4212420", "STICKY NOTES ARE MY FAVORI", "i don't know", "Brad", "The Hivemind"];

const newssentences = [
	["I love sticky notes so much they are very cool and I like them alot very cool wow!!", true],
	["Hot take: I believe that paper and adhesive doesn't taste good.", false],
	["Everyone who doesn't use sticky notes has no heart.", true],
	["I rip up stick notes for fun.", false],
	["Yum.... these notes making kme feel rffnuny. d", true],
	["UNSTICKY NOTES ARE WAY BETTER", false],
	["Sticky notes are a great way to organize your thoughts and tasks.", true],
	["I find sticky notes to be cluttered and unhelpful.", false],
	["Using sticky notes can really improve your productivity and time management.", true],
	["Sticky notes tend to fall off and get lost easily, which is frustrating.", false],
	["The bright colors of sticky notes make it easier to remember important things.", true],
	["Sticky notes are a waste of paper and not environmentally friendly.", false],
	["I love using sticky notes to leave reminders for myself and others.", true],
	["Sticky notes often lose their adhesive after a while, making them ineffective.", false],
	["With sticky notes, I can quickly jot down ideas and organize them visually.", true],
	["Sticky notes end up all over my desk and create unnecessary mess.", false],
	["I can never have too many sticky notes—they're always useful for something.", true],
	["Sticky notes seem to create more chaos than help in my workspace.", false],
	["Using sticky notes helps me stay on top of deadlines and appointments.", true],
	["I dislike how sticky notes can peel off and get stuck to things unintentionally.", false],
	["Sticky notes are perfect for leaving quick notes or reminders around the house.", true],
	["Sticky notes are just a temporary solution; they don't provide long-term organization.", false],
	["I use sticky notes to prioritize tasks and manage my workflow more effectively.", true],
	["Sticky notes just add clutter to my office and don't help me stay organized.", false],
	["I love how sticky notes can be rearranged easily for brainstorming sessions.", true],
	["Sticky notes often end up in random places and cause confusion.", false]
];

function createNews() {
	const title = newstitles[Math.floor(Math.random() * newstitles.length)];
	const author = newsauthors[Math.floor(Math.random() * newsauthors.length)];
	const sentences = [];

	for (let i = 0; i < Math.floor(Math.random() * 6) + 4; i++) {
		const sentence = newssentences[Math.floor(Math.random() * newssentences.length)];
		sentences.push({
			"text": sentence[0],
			"positive": sentence[1],
			"selected": false
		});
	}

	const news = {
		"title": title,
		"author": author,
		"sentences": sentences,
		"completed": false
	};

	displayNews(activenews.push(news) - 1);
}

function toggleNewsSentence(event) {
	const newsindex = event.target.parentElement.parentElement.getAttribute("data-newsindex");
	const selected = event.target.getAttribute("data-selected") === "true";

	if (activenews[newsindex].completed) return;

	event.target.setAttribute("data-selected", !selected);
	
	const index = event.target.getAttribute("data-sentenceindex");
	activenews[newsindex].sentences[index].selected = !selected;
}

function submitNewsArticle(event) {
	const newsindex = event.target.parentElement.getAttribute("data-newsindex");
	const sentences = activenews[newsindex].sentences;
	
	if (activenews[newsindex].completed) return;

	let points = 0;
	for (let i = 0; i < sentences.length; i++) {
		if (sentences[i].positive !== sentences[i].selected) points++;
	}
	registerNewsPoints(points);

	event.target.parentElement.children[0].children[0].innerHTML += " (Corrected " + points + "/" + sentences.length + ")";
	event.target.disabled = true;
	event.target.parentElement.setAttribute("data-completed", true);
}
