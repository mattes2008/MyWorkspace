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
	loginSignInButtonOnClick: ()=>{
    		let username = document.getElementById("login_usernameInput").value;
    		let password = document.getElementById("login_passwordInput").value;
    		myVocabulary.root.login(username, password);
    	},
	registerCancelButtonOnClick: ()=>{
		myVocabulary.scripts.hidePopupWindow(document.getElementById("register"));
	},
	registerSignupButtonOnClick: ()=>{
		let username = document.getElementById("register_usernameInput").value;
		let password = document.getElementById("register_passwordInput").value;
		let repeatPassword = document.getElementById("register_repeatPasswordInput").value;
		myVocabulary.root.register(username, password, repeatPassword);
	},
	registerImportUserButtonOnClick: ()=>{
		myVocabulary.scripts.hidePopupWindow(document.getElementById("register"));
		myVocabulary.scripts.showPopupWindow(document.getElementById("importUser"));
		document.getElementById("importUserTextArea").value = "";
	},
	userImportCancelButton: ()=>{
		myVocabulary.scripts.hidePopupWindow(document.getElementById("importUser"));
		myVocabulary.scripts.showPopupWindow(document.getElementById("register"));
	},
	userImportImportButton: ()=>{
		let jsonString = document.getElementById("importUserTextArea").value;
		try {
			myVocabulary.root.user.import(jsonString);
		} catch (e) {
			throw new Error("import has been terminated");
		}
		myVocabulary.scripts.hidePopupWindow(document.getElementById("importUser"));
		myVocabulary.scripts.hidePopupWindow(document.getElementById("register"));
	},
};