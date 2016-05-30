var dom, S, M, currentArray, buttonArray, typesArray, topicsArray;

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
            eventTopicsArray: []
        },

        methods: {
            allCallBack: function (j) {
                // Issues here: adding any string such as "test" to an array of objects automatically converts the objects
                //  into strings, so we need to build all Event objects first then we can test them.
                S.allContent = j;
                var list = JSON.parse(S.allContent);
                for (var index in list) {
                    var event = new Event(list[index]);
                    S.eventObjArray.push(event);
                    currentArray.push(event);
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
            testList: function (listIn) {
                console.log("inside testList method, do we have a global variable?");
                console.log(currentArray);
            },
            setAllEvents: function (listIn) {
                currentArray = listIn;
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
                console.log("called nav function");
                var l = current.length;
                console.log("length " + l);
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
                    // do something
                }
            },

            populateTopicsDropDown: function(listTopics) {
                console.log("inside topics drop");
                console.log(listTopics);
                var topicsDropDown = document.getElementById("eventTopicListBox");
                for(var index in listTopics) {
                    var op = document.createElement("option");
                    op.setAttribute("id", "dd" + index);
                    op.innerHTML = listTopics[index].Main_Topic;
                    topicsDropDown.appendChild(op);
                }
            },
            populateTypesDropDown: function(listTypes) {
                console.log("inside types drodown");
                console.log(listTypes);
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
            topicsArray = S.eventTopicsArray;
            typesArray = S.eventTypesArray;
            M.ajax(S.urlList.allURL, M.allCallBack);
            var tempList = currentArray;
            console.log("temp array length: " + tempList.length);
            M.setAllEvents(tempList);
            M.testList(tempList);
            M.setEventNavigation(tempList);
            //M.setEventNavigation();
            M.ajax(S.urlList.topicsURL, M.topicsCallBack);
            M.ajax(S.urlList.typesURL, M.typesCallBack);
        }
    };












