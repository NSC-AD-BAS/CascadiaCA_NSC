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
var dom, settings, methods;

    contentViewer = {
        domElements: {
            // these are easy to use string names for the different divs we will be working with
            calendarButton: "toggleCalendar",
            contentDivList: "eventContent",
            contentDivCal: "calendarContent",
            contentDetailList: "detailContent",
            list: "listChildren"
        },

        // Basic settings we need to work with - list boolean is for whether or not we are in the list view or not
        // calendar boolean is for whether or not the calendar is showing (calendar true - list will be false and vice versa)
        // current content is a dynamic object that we can use to store returned data from the server for reference to the
        //   current content the user is viewing - can be helpful for hitting the "back" button in detail view, we can reload
        //   all the information without having to requery the server
        //   urlList - a nested object. The point of this is that since we have a bunch of different php files, we need
        //     easy-to-use names for the different "url" values that we will pass to ajax. It needs a "url" variable to know which
        //     php file to query. When you need to make a custom ajax call , you need to add another property into urlList -
        //     the format is <actionName> : "<../php/whatever-php-file-you-need-to-query.php>"
        //
        // to call on any of these settings properties, use the format
        settings: {
            list: true,
            calendar: false,
            detail: false,
            currentContent: {},
            activeDiv: "",
            inactiveDiv: "",
            urlList: {
                getDefault: "../php/getEventsListView.php",
                getSubtopics: "../php/getTopics.php"
            }
        },

        init: function () {
            // the init() function is called when the landing page is loaded            
            dom = this.domElements;
            settings = this.settings;
            methods = this.viewerMethods;
            // this call starts the code flow to setup event handler for the calendar button
            methods.bindCalendarAction();
            // this call starts the code flow to make an initial ajax query to get all events to load up
            //   in the landing page
            methods.callAjaxMethod();
            // this is the first call to ajax generically - in this case we are
            // passing the url for the getSubtopics to the call, with the callback function
            // "topicsCallback()" in the city-state.js file which sets the global variable text
            // to the value of the json data returned from the server. Remember that since ajax cant instantly
            // return information, we have to pass it a callback function that we can pass the data into INSIDE
            // the ajax function itself. Read up on callback functions if you want to know more.
            methods.ajaxGeneric(settings.urlList.getSubtopics, topicsCallback);
        },      

        // the viewerMethods property of this object. This propety stores all of the action functions we need
        //   to do different things with user interaction. the format is propertyName : customDefinedFunction() {};
        viewerMethods: {
            // property "bindCalendarAction": value - a custom function we defined
            //   to access this function property, use methods.propertyName(arguments);
            //   example - line 76 (4 lines below this one)
            bindCalendarAction: function () {
                // get our calendar button from the DOM by id, and set a handler to its onclick property
                document.getElementById(dom.calendarButton).onclick = function () {
                    console.log("calendar button clicked");
                    // when the user clicks the "calendar" button, we call a nested function property - showCalendar(args);
                    methods.showCalendar(dom.contentDivList, dom.contentDivCal);
                };
            },

            // property "showCalendar": value - a custom function we defined
            //  this function is the event handler function for when the user clicks the calendar button
            //  first we check the boolean value for the settings.list property - if this is the first time the user clicked
            //  on the calendar button, the settings.list boolean will be false - so we get the div1 parameter, and set its class
            //   to "hidden". We set the div2 value class to "showing". (In this case the div1 is "eventContent" div, and div2 is
            //   the "calendarContent" div - remember that we refer to both of these divs using dom.contentDivList and
            //   dom.contentDivCal - standardized names to refer to these divs in our DOM
            showCalendar: function (div1, div2) {
                if (settings.list) {
                    document.getElementById(div1).setAttribute("class", "hidden");
                    document.getElementById(div2).setAttribute("class", "showing");
                }
                // if settings.list boolean is false, we are already in calendar view, so we need to switch back to list
                //   view. We will hide the dom.contentDivList and show the dom.contentDivCal div elements
                else {
                    document.getElementById(div1).setAttribute("class", "showing");
                    document.getElementById(div2).setAttribute("class", "hidden");
                }
                // now update boolean values to the opposite of what they currently are
                settings.list = !settings.list;
                settings.calendar = !settings.calendar;
            },

            // property "getEventsDefaultCallback" : value - custom function we defined
            // this is a custom callback function - when we call this function, we update our global variable
            //   settings.currentContent. This variable can be used to store the last json data that we queried from
            //   the server. In this first call, we get ALL events from the server and store them inside
            // this global variable for quick access without requerying the server
            getEventsDefaultCallback: function (list) {
                // set global variable to the contents of the json
                settings.currentContent = list;
                // we call on the formatDefaultAllEvents function in Formatter.js, passing it the json and the callback we pass it
                //  is methods.changeContentInListView (see below for that function definition)
                formatDefaultAllEvents(list, methods.changeContentInListView);
            },

            // property: "callAjaxMethod": value - custom function we defined
            // this function property makes a default ajax call initially
            callAjaxMethod: function() {
                // calls the getAjax property of this object, and passes it a url, and passes it the callback function
                //  "getEventsDefaultCallback"
                //  this call itself gets all events, sets the list global variable to the json content, and then calls
                //  on the formatDefaultAllEvents() function in Formatter.js
                getAjax(settings.urlList.getDefault, methods.getEventsDefaultCallback);
            },

            // We implemented this function as the MAIN call to ajax from anywhere. This method can be directly called from
            //  anywhere. To call this function inside this file itself, do several things -
            //  1. hardcode a new url property in settings.urlList - for example, if we need to get a list of topics,
            //     create a new property in settings.urlList called "getTopic": and add the value "../php/getTopics.php" to it
            //     this can be done with any php file, just make sure you define a correct url and a friendly property name that
            //     describes your intended action
            //  2. create a callback function that will do what you want with the json data on the server
            //     for example, lets say that our city-state.js file needs a json list of all topics - we can create a new
            //     function is city-state.js that will set a global variable to the value of the json data we need.
            //      - first create a new global variable inside city-state.js called "topicList"
            //      - next create a new setter function to set the "topicList" global variable:
            //        function setTopicsCallback(listParam) {
            //          topicList = listParam; // <- inside the ajax method, well pass the server json into this to set topicList
            //        }
            //     The global variable will now be set in city-state.js, and you can do what you want with it
            //To call this function from outside this file, just make sure you hardcode a url value and a callback function from
            //  wherever it is that you are calling this function
            ajaxGeneric: function(url, callback) {
                // calls the actual getAjax function from AjaxFunctions.js
                getAjax(url, callback);
            },

            // property "addToContent": value - custom function we defined
            //  currently not using this function for anything yet, we may not need it
            addToContent: function(propertyName, item) {
                // takes a new property name and adds the item value to it - currentContent is basically a content map
                settings.currentContent[propertyName] = item;
            },

            // property "getFromContent": value - custom function we defined
            //  this is a getter - look for the propertyName in our currentContent global variable and return it if it
            //   exists.
            getFromContent: function(propertyName) {
                // if this property exists in our currentContent, return it, else return false
                if(propertyName in settings.currentContent) {
                    return settings.currentContent[propertyName];
                } else {
                    return false;
                }
            },

            // property "changeContentInListView": value - custom defined function
            //  this function will take any div name from the DOM that you pass it, and will append the html that you
            //   pass it as the innerVal variable to that div.
            changeContentInListView: function(div, innerVal) {
                document.getElementById(div).appendChild(innerVal);                
            },

            // property "swapFromListToDetailView": value - custom defined function
            // this function takes a div that you pass it, sets its class to "showing" , and inserts its newInnerVal html
            //  as that divs first child element.
            // in our settings, we have activeDiv and inactiveDiv properties - we set these values to the new div that we
            //  are showing and the old div that we are hiding. This can be used with our back button
            swapFromListToDetailView: function(newDiv, newInnerVal) {
                if(settings.list) {
                    var newList = document.getElementById(newDiv);
                    newList.setAttribute("class", "showing");
                    settings.activeDiv = newList;
                    console.log("attempting to swap from list to detail view, div is: " + newList.getAttribute("id"));
                    newList.insertBefore(newInnerVal, newList.firstChild);
                    var oldList = document.getElementById(dom.contentDivList);
                    oldList.setAttribute("class", "hidden");
                    settings.inactiveDiv = oldList;
                    document.getElementById("listChildren").style.height = 0;
                    settings.list = !settings.list;
                    settings.detail = !settings.detail;
                }
                else {
                    // implement this conditional for inside the calendar view
                }
            },

            // property "swapFromDetailToListView": value - custom function we defined
            // this function will perform like the above function but will swap back to list view
            // TODO: figure out the easiest way to load up the last used div
            swapFromDetailToListView: function(newDiv, newInnerVal) {
                // implement this function for the back button inside the detail view to switch back to
                // list view.
            }

            
        }

    };
    
