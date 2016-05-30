/**
 * Created by cdub on 5/19/2016.
 */

var EVENTS, TOPICS, TYPES, BUTTONS, ELEMENTSTRINGS, REFVALUES, MONTHS;
var HTML, INDEX;

// this is our default formatter for the inital landing page load. It accepts the json of all events, and the callback
// function. In the inital case, the getEventsListView url , and the methods.getEventsDefaultCallback is passed into the
// getAjax() call. The getEventsDefaultCallback sets the json data to its currentContent global variable, then calls
//  this function with the json string. The callback method that is passed into this call is methods.changeContentInListView(),
//  which appends the below generated html into the "eventContent" div
// this function itself builds all the buttons and sets event handlers on each button for the list view
// this function also pushes each button created into the global array BUTTONS. We now have a global array of every single
// button that was generated (and each button has the event object in it, containing all the event properties
function formatDefaultAllEvents(json, callback) {
    var btnObj;
    var obj = JSON.parse(json);
    var h = document.createElement("h3");
    h.innerHTML = "Event Title - City - State - Event Topic - Event Type";
    var l = document.createElement("li");
    l.appendChild(h);
    var ul = document.createElement("ul");
    ul.setAttribute("id", "listChildren");
    ul.setAttribute("class", "dynamicList");    
    ul.appendChild(l);
    var counter = 0;
    for(var index in obj) {
        var b = document.createElement("button");
        if(counter % 2 === 0) {
            b.setAttribute("class", "darkBtn");
        }
        else {
            b.setAttribute("class", "lightBtn");
        }
        counter++;
        b.setAttribute("id", "button" + index);
        var num = "button" + index;
        var dataObj = obj[index];
        btnObj = {
            "id": num,
            "data": dataObj
        };
        BUTTONS.push(btnObj);
        var text = String(obj[index].Title + ",    " + obj[index].City + ",    " + obj[index].State + ",    " + obj[index].Main_Topic
            + " -- " + obj[index].Main_Type);
        b.innerHTML = text;
        var li = document.createElement("li");
        li.appendChild(b);
        ul.appendChild(li);
    }
    // calls the methods.changeContentInListView function in contentView.js, and passes it this entire unordered list
    callback("eventContent", ul);
    // now that the dynamically generated content is set in the DOM from the last line of code, we can now set event handlers
    // for clicking on each list button. We cant actually do anything to the dynamically generated html until it has been
    // officially set in the DOM
    attachButtonClicks();
}

// set event handlers for each button in the BUTTONS array
function attachButtonClicks() {
    var button, ref;
    for(var i = 0; i < BUTTONS.length; i++) {
        // set the ref reference variable to each index in the BUTTONS array. Each index is an actual button object which contains
        //  all data for that particular event.
        ref = BUTTONS[i];
        // Each button had a unique id set up in the as its first property : id. Find it in the DOM by the id name, and
        // add an event listener to it on its onclick property
        button = document.getElementById(ref.id);
        button.data = ref.data;
        // we are doing this iteratively for every single button in our BUTTON array
        button.addEventListener("click", function(){
            // onclick, call formatDetailView and pass it the current button as an argument
            formatDetailView(ref);
        });
    }
}

// this function is called when the user clicks on a list button. It builds a span to append to the html
// which contains all the event details
function formatDetailView(btn) {
    // create a span by calling buildDetailElements and passing it the button that was clicked
    var list = buildDetailElements(btn);
    // now that we have a span to add to te detailContent div, call the methods.swapFromListToDetail view and pass it
    // the "detailContent" div, plus the new span with all the details rendered in html
    methods.swapFromListToDetailView("detailContent", list);
}

// this function builds a span with the button that's passed into it, and returns the span to the above caller
function buildDetailElements(ref) {
    console.log(ref.data);
    // global variable, easy to use names of the keys to show as headliners
    var e = ELEMENTSTRINGS;
    // global variable, the actual properties we call on each button to get the values
    var r = REFVALUES;
    var outer = document.createElement("span");
    outer.setAttribute("id", "detailSpan");
    var h3 = document.createElement("h3");
    console.log("title value: " + ref.data["Title"]);
    h3.innerHTML = ref.data["Title"];
    outer.appendChild(h3);
    for(var i = 0; i < 13; i++) {
        var dl = document.createElement("div");
        dl.setAttribute("class", "left");
        console.log("looping, headliner value is: " + e[i]);
        dl.innerHTML = e[i];
        var dr = document.createElement("div");
        dr.setAttribute("class", "right");
        var str = r[i];
        console.log("looping, reference array property is: " + r[i] + ", button data value is: " + ref.data[str]);
        if(ref.data[str] === undefined) {
            dr.innerHTML = "Not Listed";
        }
        else {
            dr.innerHTML = ref.data[str];
        }
        var dc = document.createElement("div");
        dc.setAttribute("class", "clear");
        outer.appendChild(dl);
        outer.appendChild(dr);
        outer.appendChild(dc);
    }
    var a = document.createElement("button");
    a.setAttribute("id", "backButton");
    a.setAttribute("class", "filterButton");
    a.setAttribute("value", "Back");
    a.addEventListener("click", function(){
        var listView = document.getElementById("");
    });
    return outer;
}

BUTTONS = [];
INDEX = 0;
ELEMENTSTRINGS = ["Description:", "Main Topic:", "Main Type:", "Main Sponsor:", "Main Contact:", "Email Contact:", "Phone Contact:",
    "Street Address:", "City:", "State:", "Zip:", "Start Time:", "End Time:"];
REFVALUES = ["Description", "Main_Topic", "Main_Type", "Main_Sponsor", "Main_Contact", "Email_Contact", "Phone_Contact",
    "Street_Address", "City", "State", "Zip", "Start_Time", "End_Time"];
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
        "December"];

