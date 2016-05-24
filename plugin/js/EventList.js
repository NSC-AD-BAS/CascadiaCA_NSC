/**
 * Created By Cdub 5/16/16
 */
var urlList, URL;

// body onload function. gets all events, loads up <select> options for the filter elements
function loadFilters() {    
    urlList = {
        "defaultEvents": "cca/plugin/php/getEventsListView.php",
        "topicList": "cca/plugin/php/getTopics.php",
        "typeList": "cca/plugin/php/getTypes.php"
    };
    var callBack1 = showAll;
    getAjax(urlList.defaultEvents, callBack1);
    var callBack2 = loadTopicsInDropDown;
    getAjax(urlList.topicList, callBack2);
    var callBack3 = loadTypesInDropDown;
    getAjax(urlList.typeList, callBack3);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
            "October", "November", "December"];
    loadMonthsInDropDown(months);
}

// Callback function for loading topic dropdown list, json is the ajax request.responsetext
function showAll(json) {
    var obj = JSON.parse(json);
    // main container element in the landing page
    var container = document.getElementsByName("eventList");
    var ul = document.getElementById("listChildren");
    // create a bigass list, then append it to the main content div
    for(var index in obj) {
        // here we can format our event objects in any way we like. for now im just appending them to a one-line string
        var li = document.createElement('li');
        li.innerHTML = "Title: " + obj[index].Title + ", Topic: " + obj[index].Main_Topic + ", Type: " + obj[index].Main_Type;
        ul.appendChild(li);
    }
}

function loadTopicsInDropDown(json) {
    var obj = JSON.parse(json);
    var key = "topic";
    var selectBox = document.getElementById("eventTopicListBox");
    var count = 0;
    for(var index in obj) {
        var op = document.createElement('option');
        op.setAttribute('value', key + count);
        op.innerHTML = obj[index].Main_Topic;
        selectBox.appendChild(op);
        count++;
    }
}

function loadTypesInDropDown(json) {
    var obj = JSON.parse(json);
    var key = "type";
    var selectBox = document.getElementById("eventTypeListBox");
    var count = 0;
    for(var index in obj) {
        var op = document.createElement('option');
        op.setAttribute('value', key + count);
        op.innerHTML = obj[index].Main_Type;
        selectBox.appendChild(op);
        count++;
    }
}

function loadMonthsInDropDown(monthArray) {
    var obj = monthArray;
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











