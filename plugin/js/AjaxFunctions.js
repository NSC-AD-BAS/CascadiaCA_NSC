/**
 * Created by cdub on 5/16/2016.
 */
// Main ajax request function, it will return a json string containing ALL events from the db as the responseObject


function getAjax(url, callback, val1, val2) {
    var request, callBackFunction;
    console.log('ajax called, url is: ' + url);
    // based upon which value 'typeOfQuery' is, the php will call different functions
    try {
        request = new XMLHttpRequest();
    } catch (e) {
        console.log("Error creating request object");
    }
    callBackFunction = callback;
    request.onreadystatechange = processRequest;
    // here we pass the parameters from the caller to php
    // EXTREMELY IMPORTANT: you MUST add the "/" concatenated with the url to force php to look from the root of the app
    // if not you will have issues. this is the absolute URL, not the relative
    request.open('GET', "/" + url, true);
    //request.open('GET', '../php/getEventAjax.php?type=' + type + '&value1=' + val1 + '&value2=' + val2, true);
    request.send();


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
}






