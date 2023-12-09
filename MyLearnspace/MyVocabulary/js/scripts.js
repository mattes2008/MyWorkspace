myVocabulary.scripts = {
	toggleSidebar: ()=>{
		document.getElementById("sidebar").classList.toggle("hidden");
	},
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
	createBookOverview: (user, structure, password)=>{
		if (structure==="all") {
			document.getElementById("main_overviewTableContainer").innerHTML = "";
			let newOverviewTable = new myVocabulary.ui.OverviewTable("Books", myVocabulary.root.data.users[myVocabulary.root.indexOfName(myVocabulary.root.data.users, user)].books, ()=>{
			}, ()=>{
			}, document.getElementById("main_overviewTableContainer"));
		} else if (structure==="language") {
			document.getElementById("main_overviewTableContainer").innerHTML = "";
			for (let i of myVocabulary.root.data.users[myVocabulary.root.indexOfName(myVocabulary.root.data.users, user)].languages) {
				let newOverviewTable = new myVocabulary.ui.OverviewTable(i.name, myVocabulary.root.user.language.list(user, i.name, password), ()=>{
				}, ()=>{
				}, document.getElementById("main_overviewTableContainer"));
				newOverviewTable.element.style.backgroundColor = i.color;
				newOverviewTable.element.style.border = "5px solid " + i.color;
			}
		} else if (structure==="tag") {
			document.getElementById("main_overviewTableContainer").innerHTML = "";
			for (let i of myVocabulary.root.data.users[myVocabulary.root.indexOfName(myVocabulary.root.data.users, user)].tags) {
				let newOverviewTable = new myVocabulary.ui.OverviewTable(i.name, myVocabulary.root.user.tag.list(user, i.name, password), ()=>{
				}, ()=>{
				}, document.getElementById("main_overviewTableContainer"));
				newOverviewTable.element.style.backgroundColor = i.color;
				newOverviewTable.element.style.border = "5px solid " + i.color;
			}
		}
	},
};