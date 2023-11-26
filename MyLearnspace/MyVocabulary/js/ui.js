myVocabulary.ui = {
	OverviewTable: class {
		constructor(title, array, onSelect, onCreate, destination) {
			this.title = title;
			this.array = array;
			this.onSelect = onSelect;
			this.onCreate = onCreate;
			this.element = destination.appendChild(document.createElement("div"));
			this.element.classList.add("overviewTable");
			this.headline = this.element.appendChild(document.createElement("h1"));
			this.headline.innerText = title;
			this.indexContainer = this.element.appendChild(document.createElement("div"));
			this.indexContainer.classList.add("overviewTableIndexContainer");
			this.index = [];
			if (this.array.length===0) {
					let newIndex = this.indexContainer.appendChild(document.createElement("div"));
					newIndex.classList.add("overviewTableIndex");
					let newHeadline = newIndex.appendChild(document.createElement("h2"));
					newHeadline.innerText = "[empty]";
					this.index.push(newIndex);
			} else {
				for (let i of this.array) {
					let newIndex = this.indexContainer.appendChild(document.createElement("div"));
					newIndex.classList.add("overviewTableIndex");
					let newHeadline = newIndex.appendChild(document.createElement("h2"));
					newHeadline.innerText = i.name;
					newIndex.addEventListener("click", ()=>{
						this.onSelect(i.name);
					})
					this.index.push(newIndex);
				}
			}
			this.createContainer = this.element.appendChild(document.createElement("div"));
			this.createContainer.classList.add("overviewTableCreateContainer");
			this.createContainer.addEventListener("click", this.onCreate);
			this.createContainer.innerText = "+";
			this.createContainerText = this.createContainer.appendChild(document.createElement("h2"));
			this.createContainerText.classList.add("overviewTableCreateContainerText");
		}
	},
};