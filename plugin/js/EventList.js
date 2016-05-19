/**
 * Created By Cdub 5/16/16
 */
var jsonData, callBack;

// body onload function. gets all events, loads up <select> options for the filter elements
function loadFilters() {
    callBack = showAll;
    getEvents('all', callBack);
    callBack = loadTopicsInDropDown;
    getEvents('all', callBack);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
            "October", "November", "December"];
    loadMonthsInDropDown(months);
}

// Callback function for loading topic dropdown list, json is the ajax request.responsetext
function showAll(json) {
    obj = JSON.parse(json);
    // main container element in the landing page
    var container = document.getElementById("eventContent");
    var ul = document.getElementById("listChildren");
    // create a bigass list, then append it to the main content div
    for(var i = 0; i < obj.size; i++) {
        // here we can format our event objects in any way we like. for now im just appending them to a one-line string
        var li = document.createElement('li');
        li.innerHTML = obj[i].event_title + ", " + obj[i].address_id + ", " + obj[i].start_date_time;
        ul.appendChild(li);
    }
}

function loadTopicsInDropDown(json) {
    obj = JSON.parse(json);
    var key = "topic";
    var selectBox = document.getElementById("eventTopicListBox");
    var count = 0;
    for(var index in obj) {
        var op = document.createElement('option');
        op.setAttribute('value', key + count);
        op.innerHTML = ;
        selectBox.appendChild(op);
        count++;
    }
}

function loadMonthsInDropDown(monthArray) {
    obj = monthArray;
    var key = "month";
    var selectBox = document.getElementById("monthTextBox");
    var count = 0;
    for(var index in obj) {
        var op = document.createElement('option');
        op.setAttribute('value', key + count);
        var text = document.createTextNode(obj[index]);
        op.appendChild(text);
        selectBox.appendChild(op);
        count++;
    }
}

// shows all types in the 'eventContent' div ul
function showTypes(val) {   
    var container = document.getElementById("eventList");
    var ul = document.getElementById("listChildren");
    for(var i = 0; i < 24; i++) {
        var li = document.createElement('li');
        li.innerHTML = "Event type: " + obj[i].type;
        ul.appendChild(li);
    }
}



/////////////////////////////////////////////////////////////////////////////////
// ajax calls










