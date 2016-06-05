var dom, S, M, currentArray, buttonArray, typesArray, topicsArray, liArray, self;
var cal;

    content = {        
        domElements: {
            eventCont: "eventContent",
            detailCont: "detailContent",
            calCont: "calendarContent"                      
        },

        settings: {
            allContent: {},
            urlList: {
                allURL: "../PHP/getEventsListView.php",
                typesURL: "../PHP/getTypes.php",
                topicsURL: "../PHP/getTopics.php"
            },
            eventObjArray: [],
            buttonObjArray: [],
            eventTypesArray: [],
            eventTopicsArray: [],
            eventLiArray:[],
        },

        methods: {
            // this is the first method of the entire on-the-fly method passed to the initial ajax call
            // we set the return value of the original JSON array from php into the S.allContent variable (parsed)
            // we create a new event object for every object inside the S.allContent var and push it into the
            //  S.eventObject array (which the global array currentArray is set to as well)
            allCallBack: function (j) {
                S.allContent = JSON.parse(j);
                //console.log("first step, allCallBack called");
                var list = S.allContent;
                for (var index in list) {
                    var event = new Event(list[index]);
                    var b = event.getButton();
                    S.eventObjArray.push(event);
                    S.buttonObjArray.push(b);
                }                
            },            
            topicsCallBack: function(j) {
                S.eventTopicsArray = j;
                var list = JSON.parse(S.eventTopicsArray);
                topicsArray = list;
                M.populateTopicsDropDown(list);
            },
            typesCallBack: function(j) {
                S.eventTypesArray = j;
                var list = JSON.parse(S.eventTypesArray);
                typesArray = list;
                M.populateTypesDropDown(list);
            },
            ajax: function (url, callback) {
                getAjax(url, callback);
            },
            testList: function () {
               // test function
            },
            showDetails: function(details) {
                //console.log("callback function on click passed");
                //console.log(details);
                details.setAttribute("id", "someFuck");
                var el = document.getElementById(dom.eventCont);
                var dl = document.getElementById(dom.detailCont);
                dl.innerHTML = "";
                dl.appendChild(details);
                el.setAttribute("class", "hidden");
                dl.setAttribute("class", "showing");
            },
            setAllEvents: function (events, divId) {
                var container = document.getElementById(divId);
                var u = document.createElement("ul");
                var h = document.createElement("h3");
                h.innerHTML = "Title, City, State, Event Topic -- Event Type";
                for(var index in events) {
                    var li = document.createElement("li");
                    //console.log("setting all events: ");
                    //console.log(events[index].id);
                    var listItem = events[index].buildButton(li, M.showDetails);
                    //console.log("here is the returned list item/button: ");
                    //console.log(listItem);
                    //listItem.innerHTML = b;
                    u.appendChild(listItem);
                }
                container.appendChild(u);
            },
            getAllEvents: function () {
                return currentArray;
            },
            setAllButtons: function (listIn) {
                buttonArray = listIn;
            },
            getAllButtons: function () {
                return buttonArray;
            },
            setEventNavigation: function(current) {
                var l = current.length;
                var counter = 0;
                var endIndex = l - 1;
                if (current.length < 4) {
                    switch (l) {
                        case 2:
                            var first = current[0];
                            var second = current[1];
                            first.setNextEvent(second);
                            second.setPreviousEvent(first);
                            break;
                        case 3:
                            var first = current[0];
                            var second = current[1];
                            var third = current[2];
                            first.setNextEvent(second);
                            second.setPreviousEvent(first);
                            second.setNextEvent(third);
                            third.setPreviousEvent(second);
                            break;
                        default:
                            break;
                    }
                } else {
                    for(var i = 0; i < l; i++) {
                        console.log(current[i].getMainType());
                    }
                }
            },
            populateTopicsDropDown: function(listTopics) {
                var topicsDropDown = document.getElementById("eventTopicListBox");
                for(var index in listTopics) {
                    var op = document.createElement("option");
                    op.setAttribute("id", "dd" + index);
                    op.innerHTML = listTopics[index].Main_Topic;
                    topicsDropDown.appendChild(op);
                }
            },
            populateTypesDropDown: function(listTypes) {
                var typesDropDown = document.getElementById("eventTypeListBox");
                for(var index2 in listTypes) {
                    var op2 = document.createElement("option");
                    op2.setAttribute("id", "dd2" + index2);
                    op2.innerHTML = listTypes[index2].Main_Type;
                    typesDropDown.appendChild(op2);
                }
            },
            populateMonthsDropDown: function() {
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                    "October", "November", "December"];
                var monthsDropDown = document.getElementById("monthTextBox");
                for(var i in months) {
                    var m = document.createElement("option");
                    m.setAttribute("id", "ddMonth" + i);
                    m.innerHTML = months[i];
                    monthsDropDown.appendChild(m);
                }
            },
            setFilterHandlers: function() {
                cal = false;
                var calBtn = document.getElementById("toggleCalendar");
                var resetBtn = document.getElementById("resetAll");
                var dateResetBtn = document.getElementById("dateResetBtn");
                var searchAllBtn = document.getElementById("searchAll");
                var submitEventBtn = document.getElementById("submitNew");
                swapCalendar(calBtn);
                resetAll(resetBtn);
                resetDates(dateResetBtn);
                search(searchAllBtn);
                createNew(submitEventBtn);
            }
        },
        init: function() {
            self = this;
            dom = this.domElements;
            S = this.settings;
            M = this.methods;
            currentArray = S.eventObjArray;
            buttonArray = S.buttonObjArray;
            liArray = S.eventLiArray;
            topicsArray = S.eventTopicsArray;
            typesArray = S.eventTypesArray;
            M.ajax(S.urlList.allURL, function (j) {
                // Note that all the rest of the code is moved in this call back
                // function, so that it only executes when the Ajax response is
                // available:
                M.allCallBack(j);
                M.setAllEvents(currentArray, "eventContent");
                M.setEventNavigation(currentArray);
                // Note that you will need to take care with the following asynchronous
                // calls as well: their effect is only available when the Ajax
                // callback is triggered:
                M.ajax(S.urlList.topicsURL, M.topicsCallBack);
                M.ajax(S.urlList.typesURL, M.typesCallBack);                
            });
            M.populateMonthsDropDown();
            M.setFilterHandlers();
        }
    };












