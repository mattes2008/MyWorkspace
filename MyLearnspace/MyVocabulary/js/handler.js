myVocabulary.handler = {
	bodyOnLoad: ()=>{
		if (localStorage.getItem("myWorkspace_myVocabulary")===null) {
			myVocabulary.root.data.localStoragePermission = confirm("Do you allow this website to use 'LocalStorage' to save your user data?");
			myVocabulary.root.storage.save();
		} else {
			myVocabulary.root.storage.load();
		}
	},
	loginRegisterButtonOnClick: ()=>{
		document.getElementById("register_usernameInput").value = "";
		document.getElementById("register_passwordInput").value = "";
		document.getElementById("register_repeatPasswordInput").value = "";
		myVocabulary.scripts.showPopupWindow(document.getElementById("register"));
	},
	registerCancelButtonOnClick: ()=>{
		myVocabulary.scripts.hidePopupWindow(document.getElementById("register"));
	},
};