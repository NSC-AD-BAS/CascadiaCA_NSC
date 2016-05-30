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
                getDefault: "cca/plugin/php/getEventsListView.php"
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
                    contentViewer.showCalendar(dom.contentDivList, dom.contentDivCal);
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
                    var newList = document.getElementById(dom.contentDetailList);
                    newList.setAttribute("class", "showing");
                    var oldList = document.getElementById(dom.contentDivList);
                    oldList.setAttribute("class", "hidden");
                    settings.list = !settings.list;
                    settings.detail = !settings.detail;
                }
            }
            
        }

    };
    
