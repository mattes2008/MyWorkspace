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
	hidePopupWindow: (element)=>{
		element.classList.add("hidden");
	},
	showPopupWindow: (element)=>{
		element.classList.remove("hidden");
	},
};