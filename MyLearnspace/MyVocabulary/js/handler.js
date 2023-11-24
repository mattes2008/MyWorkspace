myVocabulary.handler = {
	bodyOnLoad: ()=>{
		if (localStorage.getItem("myWorkspace_myVocabulary")===null) {
			myVocabulary.root.data.localStoragePermission = confirm("Do you allow this website to use 'LocalStorage' to save your user data?");
			myVocabulary.root.storage.save();
		} else {
			myVocabulary.root.storage.load();
		}
	},
};