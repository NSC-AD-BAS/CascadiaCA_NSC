/** Created by Chris Wilson
 * 5/12/16
 */
// define request global var
var request;

// this is the function called from the landing page, will be updated to pass a JSON object to the php
function EventsCaller(type) {
    // sets up the ajax xhtml object
    function getEvents(typeOfQuery) {
        console.log('get events was called');
        // based upon which value 'typeOfQuery' is, the php will call different functions
        try {
            request = new XMLHttpRequest();
        } catch (e) {
            console.log("Error creating request object");
        }
        request.onreadystatechange = processResponse;
        // now we pass our array to php for it to process with variable functions
        request.open('GET', '../php/getEvent.php?type=' + typeOfQuery);
        request.send();
    }
    
    // called anytime the readystate changes 
    function processResponse() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var json = request.responseText;
                // format the json string that php passed back
                showTable(json);
            } else {
                console.log("error, nothing returned from server");
            }
        }
    }
    // actual caller for the inner functions
    getEvents(type);

}

// we will format our data here. This is more of a test sample than set-in-stone
// we will need to do a sql join to get the actual address instead of the address_id
function showTable(val) {
    // take the JSON string, and create a javascript object with it
    var obj = JSON.parse(val);
    // main container element in the landing page
    var container = document.getElementById("mainContent");
    var ul = document.createElement('ul');
    // create a bigass list, then append it to the main content div
    for(var i = 0; i < obj.length; i++) {
        // here we can format our event objects in any way we like. for now im just appending them to a one-line string
        var li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = obj[i].event_title + ", " + obj[i].address_id + ", " + obj[i].start_date_time;
        container.appendChild(ul);
    }

}



