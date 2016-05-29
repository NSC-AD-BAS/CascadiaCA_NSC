var text, events, URLLIST;
/*
var callbackCS1 = setTopicsInCityState;
getAjax(URLLIST.topicList, callbackCS1);
var callbackCS2 = setEventsInCityState;
getAjax(URLLIST.topicList, callbackCS1);
getAjax(URLLIST.eventList, callbackCS2);

function setTopicsInCityState(json) {
	text = json;
	console.log(json);
}

function setEventsInCityState(json) {
	events = json;
	console.log(json);
}
 **/


var text1 = '{"topics":[' +
'{"main_topic_id":"1","main_topic":"Fossil Fuel"},' +
'{"main_topic_id":"2","main_topic":"Legislative\/Regulatory"},' +
'{"main_topic_id":"3","main_topic":"Transport"},' +
'{"main_topic_id":"4","main_topic":"Energy"},' +
'{"main_topic_id":"5","main_topic":"Other"}]}';

var parsed = JSON.parse(text1);

var arrTopics = [];

for(var x in parsed.topics){
  arrTopics.push(parsed.topics[x].main_topic);
}
//"created" by Sam Cooledge & James the 4th

// states
var country_arr = new Array("Idaho" , "Oregon" , "Washington"); 

//topics
var topic_arr = new Array(arrTopics); //getTopic() using json from db

var events_arr = new Array("Rally", "Speaker" , "Protest" , "Concert"); //getEvent() using json from db
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
	
	
	
	for (var i=0; i< events_arr.length; i++) {
		eventsElement.options[eventsElement.length] = new Option(events_arr[i],events_arr[i]);
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

URLLIST = {	
	"topicList": "cca/plugin/php/getTopics.php",
	"eventList": "cca/plugin/php/getEventTypes.php"
};