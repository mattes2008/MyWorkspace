myVocabulary.scripts = {
	changeScreen: (screen)=>{
		for (let i of document.getElementsByClassName("screen")) {
			if (i.id===screen) {
				i.classList.remove("hidden");
			} else {
				i.classList.add("hidden");
			}
		}
	},
};