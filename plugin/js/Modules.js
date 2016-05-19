/**
 * Created by cdub on 5/19/2016.
 */
// lets organize by breaking down our calendar plugin into specific, abstracted
// modules. Consider the "pieces" of our calendar app:
//      main content viewer: shows all views including the calendar
//      filter box: contains the filters/buttons
//      event submittal: will be its own view for submitting an event

// nothing more than a content viewer object to hold information, common DOM elements related to
// this module, and functions/subfunctions associated with it
var dom, settings,
ContentViewer = {
    domElements: {
        calendarButton: "#toggleCalendar",
        contentDivList: "#eventContent",
        contentDivCal: "#calendarContent",
        list: "#listChildren"
    },

    settings: {
        list: true,
        calendar: false
    },

    init: function() {
        dom = this.domElements;
        settings = this.settings;
        this.bindUIActions();
    },

    bindUIActions: function() {
        dom.calendarButton.on("click", function() {
            ContentViewer.showCalendar(dom.contentDivList, dom.contentDivCal);
        });
    },

    showCalendar: function(div1, div2) {
        if(settings.list) {
            document.getElementById(div1).setAttribute("class", "hidden");
            document.getElementById(div2).setAttribute("class", "showing");
        }
        else {
            document.getElementById(div1).setAttribute("class", "showing");
            document.getElementById(div2).setAttribute("class", "hidden");
        }
        settings.list = !settings.list;
        settings.calendar = !settings.calendar;
    }
};