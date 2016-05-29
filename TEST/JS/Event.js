/**
 * Created by cdub on 5/19/2016.
 */

function Event(json) {
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
    this.type = {name: "nothing yet for types"};
    this.topic = {name: "nothing yet for topics"};
    this.nextEvent = null;
    this.previousEvent = null;
    this.button = null;
    this.listItem = null;
}

Event.prototype.setTypes = function(list) {
    this.type.mainType = list.Main_Type;
    this.type.subType = list.Subtype;
}

Event.prototype.setTopic = function(list) {
    this.topic.mainTopic = list.Main_Topic;
    this.topic.subTopic = list.Subtopic;
}

Event.prototype.getMainType = function() {
    return this.type.mainType;
}

Event.prototype.getSubtype = function() {
    return this.type.subType;
}

Event.prototype.getMainTopic = function() {
    return this.topic.mainTopic;
}

Event.prototype.getSubtopic = function() {
    return this.topic.subTopic;
}

Event.prototype.setNextEvent = function(next) {
    this.nextEvent = next;
}

Event.prototype.getNextEvent = function() {
    return this.nextEvent;
}

Event.prototype.setPreviousEvent = function(prev) {
    this.previousEvent = prev;
}

Event.prototype.getPreviousEvent = function() {
    return this.previousEvent;
}

Event.prototype.getButton = function() {
    return this.button;
}

Event.prototype.buildButton = function() {
    var button = document.createElement("button");
    button.setAttribute("id", "button" + this.id);
    button.setAttribute("class", "dynamicList");
    var text = String(this.title + ",    " + this.city + ",    " + this.state + ",    " + this.mainTopic
        + " -- " + this.mainType);
    button.innerHTML = text;
    this.button = button;
    return button;
}

Event.prototype.buildListElement = function() {
    var li = document.createElement("li");
    li.setAttribute("id", "li" + this.id);
    li.appendChild(this.button);
    this.listItem = li;
    return li;
}
