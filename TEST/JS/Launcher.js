var dom, S, M, currentArray, buttonArray, typesArray, topicsArray;

    content = {
        domElements: {},

        settings: {
            allContent: {},
            urlList: {
                allURL: "../PHP/getEventsListView.php",
                typesURL: "../PHP/getTypes.php",
                topicsURL: "../PHP/getTopics.php",
                filterURL: ""
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
                }
            },
            topicsCallBack: function(j) {
                S.eventTopicsArray = j;
                var list = JSON.parse(S.eventTopicsArray);
                M.populateTopicsDropDown(list);
            },
            typesCallBack: function(j) {
                S.eventTypesArray = j;
                var list = JSON.parse(S.eventTypesArray);
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
            populateTopicsDropDown: function(listTopics) {
                console.log("inside topics drop");
                console.log(listTopics);
                var topicsDropDown = document.getElementById("topics");
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
                var typesDropDown = document.getElementById("types");
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
            var tempList = S.eventObjArray;
            M.setAllEvents(tempList);
            M.testList(tempList);
            //M.setEventNavigation();
            M.ajax(S.urlList.topicsURL, M.topicsCallBack);
            M.ajax(S.urlList.typesURL, M.typesCallBack);
        }
    };












