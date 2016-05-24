



/*
var text = '{"topics":[' +
'{"main_topic_id":"1","main_topic":"Fossil Fuel"},' +
'{"main_topic_id":"2","main_topic":"Legislative\/Regulatory"},' +
'{"main_topic_id":"3","main_topic":"Transport"},' +
'{"main_topic_id":"4","main_topic":"Energy"},' +
'{"main_topic_id":"5","main_topic":"Other"}]}';

*/

var parsed = JSON.parse(text);

var arrTopics = [];

for(var x in parsed.topics){
  arrTopics.push(parsed.topics[x].main_topic);
}


var pardsed2 = JSON.parse(text2);

var arrEvents = [];

for(var x in parsed.Events) {
	arrEvents.push(parsed.topics[x].main_event);

//"created" by Sam Cooledge & James the 4th

// states
var country_arr = new Array("Idaho" , "Oregon" , "Washington"); 

//topics
var topic_arr = new Array(arrTopics); //getTopic() using json from db

var events_arr = new Array(arrEvents); //getEvent() using json from db
// Cities
var s_a = new Array();
s_a[0]="";
s_a[1]="Sun Valley| coure d'alene";
s_a[2]="Bend|Portland|Corvalis|";
s_a[3]="Seattle|Tacoma|Bellingham|Kirkland";



function populateStates( countryElementId, stateElementId ){
	
	var selectedCountryIndex = document.getElementById( countryElementId ).selectedIndex;

	var stateElement = document.getElementById( stateElementId );
	
	stateElement.length=0;	
	stateElement.options[0] = new Option('Select City','');
	stateElement.selectedIndex = 0;
	
	var state_arr = s_a[selectedCountryIndex].split("|");
	
	for (var i=0; i<state_arr.length; i++) {
		stateElement.options[stateElement.length] = new Option(state_arr[i],state_arr[i]);
	}
}


function populateTopics( topicElementId ){


	var topicElement = document.getElementById(topicElementId );
	
	topicElement.length=0;	
	
	topicElement.options[0] = new Option('Select Topic','');
	
	topicElement.selectedIndex = 0;
	
	
	
	for (var i=0; i< arrTopics.length; i++) {
	
		topicElement.options[topicElement.length] = new Option(arrTopics[i],arrTopics[i]);
		
	}
}



function populateEvents( eventsElementId ){
	
	

	var eventsElement = document.getElementById(eventsElementId );
	
	eventsElement.length=0;	
	eventsElement.options[0] = new Option('Select Event','');
	eventsElement.selectedIndex = 0;
	
	
	
	for (var i=0; i< arrEvents.length; i++) {
		eventsElement.options[eventsElement.length] = new Option(arrEvents[i],arrEvents[i]);
	}
}

function populateCountries(countryElementId, stateElementId){
	// given the id of the <select> tag as function argument, it inserts <option> tags
	var countryElement = document.getElementById(countryElementId);
	countryElement.length=0;
	countryElement.options[0] = new Option('Select State','-1');
	countryElement.selectedIndex = 0;
	for (var i=0; i<country_arr.length; i++) {
		countryElement.options[countryElement.length] = new Option(country_arr[i],country_arr[i]);
	}

	// Assigned all countries. Now assign event listener for the states.

	if( stateElementId ){
		countryElement.onchange = function(){
			populateStates( countryElementId, stateElementId );
		};
	}
}