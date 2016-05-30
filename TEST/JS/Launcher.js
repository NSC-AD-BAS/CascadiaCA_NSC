var dom, S, M, currentArray, buttonArray, typesArray, topicsArray;

    content = {
        domElements: {},

        settings: {
            allContent: {},
            urlList: {
                allURL: "../php/getEventsListView.php",
                typesURL: "../php/getTopics.php",
                topicsURL: "../php/getTypes.php",
                filterURL: ""
            },
            eventObjArray: [],
            buttonObjArray: [],
            typesArray: [],
            topicsArray: []
        },

        methods: {
            allCallBack: function(j) {
                // Issues here: adding any string such as "test" to an array of objects automatically converts the objects
                //  into strings, so we need to build all Event objects first then we can test them.
                S.allContent = j;
                var list = JSON.parse(S.allContent);
                for(var index in list) {
                    var event = new Event(list[index]);
                    S.eventObjArray.push(event);
                }
            },
            ajax: function(url, callback) {
                getAjax(url, callback);
            },
            testList: function(listIn) {
                console.log("inside testList method, do we have a global variable?");
                console.log(currentArray);
            },
            setAllEvents: function(listIn) {                
                currentArray = listIn;
            },
            getAllEvents: function() {
                return currentArray;
            },
            setAllButtons: function(listIn) {
                buttonArray = listIn;
            },
            getAllButtons: function() {
                return buttonArray;
            },
            setEventNavigation: function(current) {
                console.log("called nav function");
                var l = current.length;
                console.log("length " + l);
                var counter = 0;
                var endIndex = l - 1;
                if(currentArray.length < 4) {
                    switch(l) {
                        case 2:
                            var first = currentArray[0];
                            var second = currentArray[1];
                            first.setNextEvent(second);
                            second.setPreviousEvent(first);
                            break;
                        case 3:
                            var first = currentArray[0];
                            var second = currentArray[1];
                            var third = currentArray[2];
                            first.setNextEvent(second);
                            second.setPreviousEvent(first);
                            second.setNextEvent(third);
                            third.setPreviousEvent(second);
                            break;
                        default:
                            break;
                    }
                }
                else {
                    console.log("entering longer navigation case");
                    var firstE = currentArray[0];
                    console.log(firstE);
                    var lastE = currentArray[endIndex];
                    firstE.setNextEvent(currentArray[1]);
                    lastE.setPreviousEvent(currentArray[endIndex - 1]);
                    counter++;
                    while(counter > 0 && counter < endIndex) {
                        var current = currentArray[counter];
                        current.setPreviousEvent(currentArray[counter - 1]);
                        current.setNextEvent(currentArray[counter + 1]);
                        counter++;
                    }
                }

            }
        },

        init: function() {
            dom = this.domElements;
            S = this.settings;
            M = this.methods;
            currentArray = S.eventObjArray;
            buttonArray = S.buttonObjArray;
            typesArray = S.typesArray;
            topicsArray = S.topicsArray;
            M.ajax(S.urlList.allURL, M.allCallBack);
            var tempList = currentArray;
            console.log("temp array length: " + tempList.length);
            M.setAllEvents(tempList);
            M.testList(tempList);
            M.setEventNavigation(tempList);
        }
    }












