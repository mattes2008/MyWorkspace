myVocabulary.handler = {
	bodyOnLoad: ()=>{
		if (localStorage.getItem("myWorkspace_myVocabulary")===null) {
			root.data.localStoragePermission = confirm("Do you allow this website to use 'LocalStorage' to save your user data?");
			root.storage.save();
		}
	},
};