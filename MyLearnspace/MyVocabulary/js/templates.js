const myVocabulary = {};
myVocabulary.templates = {
	Root: class {
		constructor() {
			this.data = {
				localStoragePermission: false,
				users: [],
				temporal: {
					user: "",
					book: "",
					unit: "",
				},
			};
			this.storage = {
				save: ()=>{
					if (this.data.localStoragePermission) {
						localStorage.setItem("myWorkspace_myVocabulary", JSON.stringify(this.data));
					}
				},
				load: ()=>{
					this.data = JSON.parse(localStorage.getItem("myWorkspace_myVocabulary"));
				},
			};
			this.user = {
				create: (name, password)=>{
					for (let i of this.data.users) {
						if (i.name===name) {
							throw new Error("user '"+name+"' already exists");
						}
					}
					this.data.users.push(new myVocabulary.templates.User(name, password));
					this.storage.save();
				},
				remove: (name, password)=>{
					for (let i=0; i<this.data.users.length; i++) {
						if (name===this.data.users[i].name) {
							if (this.user.passwordMatch(name, password)) {
								this.data.users.splice(i, 1);
							}
						}
					}
					this.storage.save();
				},
				passwordMatch: (name, password)=>{
					for (let i of this.data.users) {
						if (i.name===name) {
							if (i.password===password) {
								return true;
							} else {
								return false;
							}
						}
					}
					throw new Error("user '"+name+"' does not exist");
				},
			};
			this.book = {
				create: (user, book, password)=>{
					let userIndex = this.indexOfName(this.data.users, user);
					for (let i of this.data.users[userIndex].books) {
						if (i.name===book) {
							throw new Error("book '"+book+"' already exists");
						}
					}
					if (this.user.passwordMatch(user, password)) {
						this.data.users[userIndex].books.push(new myVocabulary.templates.Book(book));
					}
					this.storage.save();
				},
				remove: (user, book, password)=>{
					let userIndex = this.indexOfName(this.data.users, user);
					for (let i=0; i<this.data.users[userIndex].books.length; i++) {
						if (this.data.users[userIndex].books[i].name===book) {
							if (this.user.passwordMatch(user, password)) {
								this.data.users[userIndex].books.splice(i, 1);
							}
						}
					}
					this.storage.save();
				},
			};
			this.unit = {
				create: (user, book, unit, password)=>{
					let userIndex = this.indexOfName(this.data.users, user);
					let bookIndex = this.indexOfName(this.data.users[userIndex].books, book);
					for (let i of this.data.users[userIndex].books[bookIndex].units) {
						if (i.name===unit) {
							throw new Error("unit '"+unit+"'does not exist");
						}
					}
					if (this.user.passwordMatch(user, password)) {
						this.data.users[userIndex].books[bookIndex].units.push(new myVocabulary.templates.Unit(unit));
					}
					this.storage.save();
				},
				remove: (user, book, unit, password)=>{
					let userIndex = this.indexOfName(this.data.users, user);
					let bookIndex = this.indexOfName(this.data.users[userIndex].books, book);
					for (let i=0; i<this.data.users[userIndex].books[bookIndex].units.length; i++) {
						if (this.data.users[userIndex].books[bookIndex].units[i].name===unit) {
							if (this.user.passwordMatch(user, password)) {
								this.data.users[userIndex].books[bookIndex].units.splice(i, 1);
							}
						}
					}
					this.storage.save();
				},
			};
			this.vocabulary = {
				create: (user, book, unit, password, source, target)=>{
					let userIndex = this.indexOfName(this.data.users, user);
					let bookIndex = this.indexOfName(this.data.users[userIndex].books, book);
					let unitIndex = this.indexOfName(this.data.users[userIndex].books[bookIndex].units, unit);
					if (this.user.passwordMatch(user, password)) {
						this.data.users[userIndex].books[bookIndex].units[unitIndex].vocabulary.push(new myVocabulary.templates.Vocabulary(source, target));
					}
					this.storage.save();
				},
				remove: (user, book, unit, vocabularyIndex, password)=>{
					let userIndex = this.indexOfName(this.data.users, user);
					let bookIndex = this.indexOfName(this.data.users[userIndex].books, book);
					let unitIndex = this.indexOfName(this.data.users[userIndex].books[bookIndex].units, unit);
					if (this.user.passwordMatch(user, password)) {
						this.data.users[userIndex].books[bookIndex].units[unitIndex].vocabulary.splice(vocabularyIndex, 1);
					}
					this.storage.save();
				},
				change: (user, book, unit, vocabularyIndex, password, source, target)=>{
					let userIndex = this.indexOfName(this.data.users, user);
					let bookIndex = this.indexOfName(this.data.users[userIndex].books, book);
					let unitIndex = this.indexOfName(this.data.users[userIndex].books[bookIndex].units, unit);
					if (this.user.passwordMatch(user, password)) {
						this.data.users[userIndex].books[bookIndex].units[unitIndex].vocabulary[vocabularyIndex].source = source;
						this.data.users[userIndex].books[bookIndex].units[unitIndex].vocabulary[vocabularyIndex].target = target;
					}
					this.storage.save();
				},
			};
			this.indexOfName = (array, name)=>{
				for (let i=0; i<array.length; i++) {
					if (array[i].name===name) {
						return i;
					}
				}
			};
			this.login = (user, password)=>{
				if (this.user.passwordMatch(user, password)) {

				}
			};
		}
	},
	User: class {
		constructor(name, password){
			this.name = name;
			this.password = password;
			this.type = "user";
			this.books = [];
			this.statistic = new myVocabulary.templates.Statistic();
		}
	},
	Book: class {
		constructor(name) {
			this.name = name;
			this.type = "book";
			this.units = [];
			this.statistic = new myVocabulary.templates.Statistic();
		}
	},
	Unit: class {
		constructor(name) {
			this.name = name;
			this.type = "unit";
			this.vocabulary = [];
			this.statistic = new myVocabulary.templates.Statistic();
		}
	},
	Vocabulary: class {
		constructor(source, target) {
			this.source = source;
			this.target = target;
		}
	},
	Statistic: class {
		constructor() {
			this.totalStars = 0;
			this.tries = {
				total: 0,
				passed: 0,
				failed: 0,
			};
			this.percentage = ()=>{
				return (this.tries.passed/this.tries.total)*100
			};
		}
	},
};
myVocabulary.root = new myVocabulary.templates.Root();