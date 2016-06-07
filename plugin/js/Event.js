/**
 * Created by cdub on 5/19/2016.
 */
var self;

function Event(json) {
    self = this;
    this.id = json.Event_Id;
    this.title = json.Title;
    this.description = json.Description;
    this.city = json.City;
    this.state = json.State;
    this.zipCode = json.ZIP;
    this.address = json.Street_Address;
    this.building = json.Building;
    this.startTime = json.Start_Time;
    this.endTime = json.End_Time;
    this.contact = json.Main_Contact;
    this.contactEmail = json.Contact_Email;
    this.phone = json.Contact_Phone;
    this.mainSponsor = json.Main_Sponsor;
    this.type = json.Main_Type;
    this.topic = json.Main_Topic;
    this.nextEvent = undefined;
    this.previousEvent = undefined;
    this.items = [this.id, this.description,  this.type, this.topic, this.city, this.state, this.zipCode, this.address,
        this.building, this.startTime, this.endTime, this.contact, this.contactEmail, this.phone, this.mainSponsor];
    this.headerEls = ["ID: ", "Description: ",  "Event Type: ", "Event Topic: ", "City: ", "State: ", "Zip Code: ", "Address: ",
    "Building: ", "Start Date/Time: ", "End Date/Time: ", "Contact Name: ", "Contact Email: ",
    "Contact Phone: ", "Main Sponsor: "];
    this.button = undefined;
    this.buildDetailView();
}

Event.prototype.getId = function() {
    return this.id;
};

Event.prototype.getMainType = function() {
    return this.type;
};

Event.prototype.getMainTopic = function() {
    return this.topic;
};

Event.prototype.setNextEvent = function(next) {
    this.nextEvent = next;
};

Event.prototype.getNextEvent = function() {
    return this.nextEvent;
};

Event.prototype.setPreviousEvent = function(prev) {
    this.previousEvent = prev;
};

Event.prototype.getPreviousEvent = function() {
    return this.previousEvent;
};

Event.prototype.getButton = function() {
    return this.button;
};

Event.prototype.getDetailView = function() {
    return this.detailView;
};

Event.prototype.buildDetailView = function() {    
    var ul = document.createElement("ul");
    ul.setAttribute("class", "dynamicList");
    var h = document.createElement("h3");
    h.innerHTML = this.title;
    var li = document.createElement("li");
    li.appendChild(h);
    ul.appendChild(li);
    for(var i = 0; i < this.items.length; i++) {
        var l = document.createElement("li");
        var textHeader = String(this.headerEls[i]);
        var headerData;
        if(this.items[i] == null) {
            headerData = String("N/A");
        }
        else {
            headerData = this.items[i];
        }
        var str = textHeader + "  --  " + headerData;
        l.innerHTML = str;
        ul.appendChild(l);
    }
    var exitBtn = document.createElement("button");
    exitBtn.setAttribute("class", "exitButton");
    exitBtn.innerHTML = "Back To Events";
    exitBtn.addEventListener('click', function() {
        var details = document.getElementById("detailContent");
        details.innerHTML = "";        
        details.setAttribute("class", "hidden");
        document.getElementById("eventContent").setAttribute("class", "showing");
    }, false);
    var lastLi = document.createElement("li");
    lastLi.appendChild(exitBtn);
    ul.appendChild(lastLi);    
    this.detailView = ul;
    //return this.detailView;
};

Event.prototype.buildButton = function(listItem, callbackFunc) {
    var button = document.createElement("button");
    button.setAttribute("id", "btn" + this.id);
    button.setAttribute("class", "lightBtn");
    var text = this.title + ", " + this.city + ", " + this.state + ", " + this.topic
        + " -- " + this.type;
    button.innerHTML = text;
    var view = this.detailView;
    // bind the detail view of this Event object to the callback function inside the event handler
    button.addEventListener('click', function() {
        callbackFunc(view);
    }, false);
    this.button = button;
    listItem.appendChild(button);
    return listItem;
};






