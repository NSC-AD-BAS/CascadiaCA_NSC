var dom, S, M, currentArray, buttonArray, typesArray, topicsArray, liArray;

    content = {
        domElements: {},

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
            eventLiArray:[]
        },

        methods: {
            // this is the first method of the entire on-the-fly method passed to the initial ajax call
            // we set the return value of the original JSON array from php into the S.allContent variable (parsed)
            // we create a new event object for every object inside the S.allContent var and push it into the
            //  S.eventObject array (which the global array currentArray is set to as well)
            allCallBack: function (j) {
                S.allContent = JSON.parse(j);
                console.log("first step, allCallBack called");
                var list = S.allContent;
                for (var index in list) {
                    var event = new Event(list[index]);
                    S.buttonObjArray.push(event.getButton());
                    S.eventLiArray.push(event.getListElement());
                    S.eventObjArray.push(event);
                }                
            },
            setButtonHandlers: function(j) {
                for(var i = 0; i < j.length; i++) {
                    var el = j[i];
                    el.addEventListener('click', function(el) {
                        console.log("you have clicked " + el);
                    });
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
            setAllEvents: function (btns, litems, divId) {
                console.log("passing this function into ajax for all events");
                var container = document.getElementById(divId);
                var ul = document.createElement("ul");
                ul.setAttribute("class", "dynamicList");
                for(var index in litems) {
                    var l = litems[index];
                    ul.appendChild(l);
                }
                container.appendChild(ul);
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
            }
        },
        init: function() {
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
                M.setButtonHandlers(liArray);
                M.setAllEvents(buttonArray, liArray, "eventContent");
                M.setEventNavigation(currentArray);
                // Note that you will need to take care with the following asynchronous
                // calls as well: their effect is only available when the Ajax
                // callback is triggered:
                M.ajax(S.urlList.topicsURL, M.topicsCallBack);
                M.ajax(S.urlList.typesURL, M.typesCallBack);
            });
        }
    };












