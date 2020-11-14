const BASE_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
	newUserForm();
	getStatesOutlines();
	clickOnStateLinks();
});

function newUserForm() {
	const userForm =	`<div class="fullscreen" id="new-user-form">
							<h2>Welcome traveler!</h2>
							<h2>What is your name?"</h2><br>
							<form>
								<input type="text" id="username" username="username" required minlength="2" placeholder="Name" size="30">
								<br><input type="submit" value="Lets go!">
							</form>
						</div>`;
	const userName = document.getElementById("user-form");
	userName.innerHTML = userForm;
	document.getElementById("new-user-form").addEventListener("submit", createUser)
}

function createUser() {
    const user = {
		username: document.getElementById("username").value,
	}
    fetch(BASE_URL + "/users", {
		method: "POST",
		body: JSON.stringify(user),
		headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
	})
	.then(response => response.json())
	.then(user => {
		document.getElementById("username").innerHTML += "Hello, " + `${user.username}` + "!";
		//document.getElementById("visited-states").innerHTML += "Visited states " + `(${user.user_states.length})` + ":";
	})
	clearForm();
}

function clearForm(){
	const welcomePage = document.getElementById("new-user-form");
	welcomePage.remove()
}

function createUserState(state) {
    fetch(BASE_URL + "/user_states", {
		method: "POST",
		body: JSON.stringify(state),
		headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
	})
	.then(response => response.json())
	.then(createStateElement)
}

function removeUserState(state) {
	const configObj = {
		method: "DELETE",
		headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
	}
	fetch(BASE_URL + `/user_states/${state}`, configObj)
	.then(state => {
		const stateToRemove = state["url"].slice(34).replace("%20", " ");
		let statesList = document.getElementsByTagName("a");
		for(let i = 0; i < statesList.length; i++){
			if(statesList[i].innerHTML === stateToRemove){
				statesList[i].parentElement.remove();
			}
		}
	})
}

function createStateElement(user_state){
	const statesList = document.querySelector("#states-list ul");
	statesList.innerHTML +=(new State(user_state.state)).render();
	console.log(new State(user_state.state))
}

function clickOnStateLinks(){
	const statesList = document.getElementById("states-list")
	statesList.addEventListener("click", event => {

		console.log(event.target.dataset.id);

		// console.log(State.find(state => state.id == state_id))

		showStateInfo(event);
	})
}

function showStateInfo(){
	return	(
			`<div id="grid-left-2" class="grid-left">
				<h2>&{this.state} (&{this.abbreviation})</h2>
				<ul>
				<li>Admission to statehood: &{this.admission_to_statehood}</li>
				<li>Nickname: &{this.nickname}</li>
				<li>Capital: &{this.capital}</li>
				<li>Population (2013): &{this.population_2013}</li>
				</ul>
				<br><button type="button" value="Back">
			</div>`
	);
	//document.getElementById("grid-left-2").addEventListener("button", clearState)
}

function clearState(){
	const statePage = document.getElementById("grid-left-2");
	statePage.remove()
}

function getStatesOutlines(){
	return fetch(BASE_URL + "/states")
	.then(response => response.json())
	.then(statesData => {
		const statesOutlines = statesData.map(({abbreviation, state, outline}) => ({abbreviation, state, outline}));
		const statesMap = statesOutlines.map(state => ({id: state.abbreviation, n: state.state, d: state.outline}));
		return statesMap;
	})
}

//United states map taken from https://gist.github.com/NPashaP/a74faf20b492ad377312#file-block with addition of a click event

(async function(){

	const uStatePaths = await getStatesOutlines();
	const uStates={};
		
	uStates.draw = function(id, data, label){		
		function mouseOver(d){
			d3	.select("#label")
				.transition()
				.duration(200)
				.style("opacity", .9);   

			d3	.select("#label")
				.html(label(d.n, data[d.id]))  
				.style("left", (d3.event.pageX) + "px")     
				.style("top", (d3.event.pageY - 28) + "px");
		}
		function mouseOut(d){
			d3	.select("#label")
				.transition()
				.duration(500)
				.style("opacity", 0);      
		}
		function mouseClick(d){
			const state = d3	
				.select(id)
				.selectAll(".state." + d.id) 
			if (state[0][0].style.fill === ""){
				state.style("fill",function(d){ return "#066406"})
				createUserState(d.n);
			} else {
				state.style("fill",function(d){ return ""})
				removeUserState(d.n);
			}
		}
		
		d3	.select(id)
			.selectAll(".state")
			.data(uStatePaths)
			.enter()
			.append("path")
			.attr("class", d => "state " + d.id)
			.attr("d",function(d){ return d.d;})
			.style("fill",function(d){ return data[d.id].color; })
			.on("mouseover", mouseOver)
			.on("mouseout", mouseOut)
			.on("click", mouseClick);
	}
	this.uStates=uStates;

	function labelHtml(n, d){	/* function to create html content string in label div. */
		return "<h4>"+n+"</h4>";
	}
	const sampleData ={};	/* Sample random data. */	
	["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
	"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
	"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
	"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
	"WI", "MO", "AR", "OK", "KS", "LA", "VA"]
		.forEach(function(d){ 
			let low=Math.round(100*Math.random()), 
				mid=Math.round(100*Math.random()), 
				high=Math.round(100*Math.random());
			sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), avg:Math.round((low+mid+high)/3)}; 
		});
	/* draw states on id #statesvg */	
	uStates.draw("#statesvg", sampleData, labelHtml);
	d3.select(self.frameElement).style("height", "600px"); 
})();

  
class State {
    constructor(state) {
		this.id = state.id
		this.state = state.state
		this.abbreviation = state.abbreviation
		this.admission_to_statehood = state.admission_to_statehood
		this.nickname = state.nickname
		this.capital = state.capital
		this.population_2013 = state.population_2013
    }

    render() {
        return (`<li>
					<a href="#" data-id="${this.id}">${this.state}</a>
            	</li>`
        )
    }
}