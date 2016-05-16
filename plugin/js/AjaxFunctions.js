/**
 * Created by cdub on 5/16/2016.
 */

// define request global var
var request, listObj;

// Main ajax request function, it will return a json string containing ALL events from the db as the responseObject
function getEvents(typeOfQuery, val1, val2) {
    console.log('ajax called');
    // based upon which value 'typeOfQuery' is, the php will call different functions
    try {
        request = new XMLHttpRequest();
    } catch (e) {
        console.log("Error creating request object");
    }
    request.onreadystatechange = function(){callBack(typeOfQuery);};
    // here we pass the parameters from the caller to php
    request.open('GET', '../php/getEvent.php?type=' + typeOfQuery + '&value1=' + val1 + '&value2=' + val2, true);
    request.send();
}


// called anytime the readystate changes
function callBack(type) {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            console.log("callback function being called");
            var json = request.responseText;
            listObj = JSON.parse(json);
            switch(type) {
                case 'all':
                    eventContentCallBack(listObj, type);
                    break;
                case 'typeList':
                    loadLists('eventTypeListBox', listObj);
                    break;
                case 'topicList':
                    loadLists('eventTopicListBox', listObj);
                    break;
                default:
                    break;
            }

        } else {
            console.log("error, nothing returned from server");
        }
    }
}


