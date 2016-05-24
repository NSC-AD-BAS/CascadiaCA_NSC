/**
 * Created by cdub on 5/19/2016.
 */
// Content View module - one of several specific, abstracted
// modules. Consider the "pieces" of our calendar app:
//      main content viewer: shows all views including the calendar, detail view, list view, submit event
//      filter box: contains the filters/buttons
//      event submittal: will be its own view for submitting an event
//      calendar: its own view for viewing everything in the list view

// nothing more than a content viewer object to hold information, common DOM elements related to
// this module, and functions/subfunctions associated with it
var dom, settings, methods,

    contentViewer = {
        domElements: {
            calendarButton: "toggleCalendar",
            contentDivList: "eventContent",
            contentDivCal: "calendarContent",
            contentDetailList: "detailContent",
            list: "listChildren"
        },

        settings: {
            list: true,
            calendar: false,
            detail: false,
            currentContent: {},
            urlList: {
                getDefault: "../php/getEventsListView.php"
            }
        },

        init: function () {
            console.log("init called");
            dom = this.domElements;
            settings = this.settings;
            methods = this.viewerMethods;
            methods.bindCalendarAction();
            methods.callAjaxMethod();
        },

        viewerMethods: {
            bindCalendarAction: function () {
                document.getElementById(dom.calendarButton).onclick = function () {
                    console.log("calendar button clicked");
                    methods.showCalendar(dom.contentDivList, dom.contentDivCal);
                };
            },

            showCalendar: function (div1, div2) {
                if (settings.list) {
                    document.getElementById(div1).setAttribute("class", "hidden");
                    document.getElementById(div2).setAttribute("class", "showing");
                }
                else {
                    document.getElementById(div1).setAttribute("class", "showing");
                    document.getElementById(div2).setAttribute("class", "hidden");
                }
                settings.list = !settings.list;
                settings.calendar = !settings.calendar;
            },

            getEventsDefaultCallback: function (list) {
                settings.currentContent = list;
                formatDefaultAllEvents(list, methods.changeContentInListView);
            },

            callAjaxMethod: function() {
                getAjax(settings.urlList.getDefault, methods.getEventsDefaultCallback);
            },

            addToContent: function(propertyName, item) {
                settings.currentContent[propertyName] = item;
            },

            getFromContent: function(propertyName) {
                if(propertyName in settings.currentContent) {
                    return settings.currentContent[propertyName];
                }
            },

            changeContentInListView: function(div, innerVal) {
                document.getElementById(div).appendChild(innerVal);
            },

            swapFromListToDetailView: function(newDiv, newInnerVal) {
                if(settings.list) {
                    var newList = document.getElementById(newDiv);
                    newList.setAttribute("class", "showing");
                    console.log("attempting to swap from list to detail view, div is: " + newList.getAttribute("id"));
                    newList.insertBefore(newInnerVal, newList.firstChild);
                    var oldList = document.getElementById(dom.contentDivList);
                    oldList.setAttribute("class", "hidden");
                    document.getElementById("listChildren").style.height = 0;
                    settings.list = !settings.list;
                    settings.detail = !settings.detail;
                }
            },

            updateCityStateLists: function() {

            }

        }

    };
