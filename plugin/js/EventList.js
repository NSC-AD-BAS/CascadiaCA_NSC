/**
 * Created By Cdub 5/16/16
 */
var jsonData, callBack;

// body onload function. gets all events, loads up <select> options for the filter elements
function loadFilters() {
    callBack = showAll;
    getEvents('all', callBack);
    var months = {
            jan: "January",
            feb: "February",
            mar: "March",
            apr: "April",
            may: "May",
            june: "June",
            july: "July",
            aug: "August",
            sep: "September",
            oct: "October",
            nov: "November",
            dec: "December"
        };
    loadLists('monthTextBox', months);

}

// Callback function for default event list view, json is the ajax request.responsetext
function showAll(json) {
    obj = JSON.parse(json);
    // main container element in the landing page
    var container = document.getElementById("eventList");
    var ul = document.getElementById("listChildren");
    // create a bigass list, then append it to the main content div
    for(var i = 0; i < 24; i++) {
        // here we can format our event objects in any way we like. for now im just appending them to a one-line string
        var li = document.createElement('li');
        li.innerHTML = obj[i].event_title + ", " + obj[i].address_id + ", " + obj[i].start_date_time;
        ul.appendChild(li);
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

function loadLists(divType, vals) {
    var str;
    var key = "Event Topic";
    var selectBox = document.getElementById(divType);
    for(var index in vals) {
        var op = document.createElement('option');
        if (divType === 'topicList') {
            var innerObj = vals[2];
            str = innerObj.key;
        }
        else {
            str = vals[index];
            var val = document.createTextNode(str);
            op.appendChild(val);
            op.setAttribute('value', 'index');
            op.setAttribute('class', 'listOption');
            selectBox.appendChild(op);
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////
// ajax calls










