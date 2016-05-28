var dom, S, M, list;

    content = {
        domElements: {},

        settings: {
            allContent: {},
            urlList: {
                allURL: "../PHP/getEventsListView.php"
            },
            eventObjArray: []
        },

        methods: {
            allCallBack: function(j) {
                content.settings.allContent = j;
            },
            ajax: function(url, callback) {
                getAjax(url, callback);
            },
            setList: function(listIn) {
               
            }
        },

        init: function() {
            dom = this.domElements;
            S = this.settings;
            M = this.methods;
            M.ajax(S.urlList.allURL, M.allCallBack);
            var list = this.settings.allContent;
            M.setList(list);
        }
    }












