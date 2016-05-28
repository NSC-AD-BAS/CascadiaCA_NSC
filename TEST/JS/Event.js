/**
 * Created by cdub on 5/19/2016.
 */



function Event(json) {
    this.id = json.Event_Id;
    this.title = json.Title;
    this.description = json.Description;
    this.city = json.City;
    this.state = json.State;
    this.type = {};
    this.topic = {};
    this.nextId = null;
    this.previousId = null;
    this.details = json;
}

Event.prototype.setTypes = function(list) {
}

Event.prototype.setTopics = function(list) {
    this.topic.mainTopic = list[Main_Topic];
    this.topic.subTopic = list[Subtopic];
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

Event.prototype.setNextId = function(next) {
    this.nextId = next;
}

Event.prototype.setPreviousId = function(prev) {
    this.previousId = prev;
}

Event.prototype.buildButton = function() {
    var button = document.createElement("button");
    button.setAttribute("id", "button" + this.id);
    var text = String(this.title + ",    " + this.city + ",    " + this.state + ",    " + this.mainTopic
        + " -- " + this.mainType);
    button.innerHTML = text;
    return button;
}
