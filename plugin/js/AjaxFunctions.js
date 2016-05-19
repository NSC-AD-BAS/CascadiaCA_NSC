/**
 * Created by cdub on 5/16/2016.
 */
// Main ajax request function, it will return a json string containing ALL events from the db as the responseObject
var request, callBackFunction;

function getEvents(type, callback, val1, val2) {
    console.log('ajax called');
    // based upon which value 'typeOfQuery' is, the php will call different functions
    try {
        request = new XMLHttpRequest();
    } catch (e) {
        console.log("Error creating request object");
    }
    callBackFunction = callback;
    request.onreadystatechange = processRequest;
    // here we pass the parameters from the caller to php
    request.open('GET', '../php/getEventsListView.php?type=' + type, true);
    //request.open('GET', '../php/getEventAjax.php?type=' + type + '&value1=' + val1 + '&value2=' + val2, true);
    request.send();
}


function processRequest() {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            var json = request.responseText;
            callBackFunction(json);
        } else {
            console.log("error, nothing returned from server");
        }
    }
}






