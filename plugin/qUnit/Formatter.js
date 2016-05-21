/**
 * Created by cdub on 5/19/2016.
 */

var EVENTS, TOPICS, TYPES, BUTTONS, ELEMENTSTRINGS, REFVALUES;
var HTML, INDEX;

function formatDefaultAllEvents(json, callback) {
    var btnObj;
    var obj = JSON.parse(json);
    var h = document.createElement("h3");
    h.innerHTML = "Event Title | City | State | Event Topic | Event Type";
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
        var dataObj = obj[index];;
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
    callback("eventContent", ul);
    attachButtonClicks();
}

function attachButtonClicks() {
    var button, ref;
    for(var i = 0; i < BUTTONS.length; i++) {
        ref = BUTTONS[i];
        button = document.getElementById(ref.id);
        button.addEventListener("click", function(){
            formatDetailView(ref);
        });
    }
}

function formatDetailView(btn) {
    var list = buildDetailElements(btn);
    
}

function buildDetailElements(ref) {    
    var e = ELEMENTSTRINGS;
    var r = REFVALUES;
    var outer = document.getElementById("detailContent");   
    var h3 = HTML.h3;
    h3.innerHTML = ref.Title;
    outer.appendChild(h3);
    for(var i = 1; i < 13; i++) {
        var dl = document.createElement("div");
        dl.setAttribute("class", "left");
        dl.innerHTML = e[i];
        var dr = document.createElement("div");
        dr.setAttribute("class", "right");
        dr.innerHTML = ref.r[i];
        var dc = document.createElement("div");
        dc.setAttribute("class", "clear");
        outer.appendChild(dl);
        outer.appendChild(dr);
        outer.appendChild(dc);
    }
    var a = document.createElement("button");
    a.setAttribute("id", "backButton");
    a.setAttribute("class", "filterButton");
    a.addEventListener("click", function(){
        var listView = document.getElementById("")
    });
    return outer;
}

BUTTONS = [];
INDEX = 0;
ELEMENTSTRINGS = ["Description:", "Main Topic:", "Main Type:", "Main Sponsor:", "Main Contact:", "Email Contact:", "Phone Contact:",
    "Street Address:", "City:", "State:", "Zip:", "Start Time:", "End Time:"];
REFVALUES = ["Description", "Main_Topic", "Main_Type", "Main_Sponsor", "Main_Contact", "Email_Contact", "Phone_Contact",
    "Street_Address", "City", "State", "Zip", "Start_Time", "End_Time"];

