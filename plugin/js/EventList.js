/** Created by Chris Wilson
 * 5/12/16
 */
// define request global var
var request;

// This is the function called from the landing page. We will add an onclick listener for the filter form submit
// button, which will call this function and pass all the proper textfield user variables to it.
// For drop down list filters, we will have listeners for onSelect() that will do the same thing

function getEvents(typeOfQuery, val1, val2) {
    // based upon which value 'typeOfQuery' is, the php will call different functions
    try {
        request = new XMLHttpRequest();
    } catch (e) {
        console.log("Error creating request object");
    }
    request.onreadystatechange = processResponse;
    // now we pass our array to php for it to process with variable functions
    request.open('GET', '../php/getEvent.php?type=' + typeOfQuery + '&value1=' + val1 + '&value2=' + val2);
    request.send();
}

// called anytime the readystate changes
function processResponse() {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            var json = request.responseText;
            // format the json string that php passed back
            console.log("heres the json: " + json);
            showTable(json);
        } else {
            console.log("error, nothing returned from server");
        }
    }
}

// we will format our data here. This is more of a test sample than set-in-stone
// we will need to do a sql join to get the actual address instead of the address_id
function showTable(val) {
    // take the JSON string, and create a javascript object with it
    var obj = JSON.parse(val);
    // main container element in the landing page
    var container = document.getElementById("eventList");
    var ul = document.getElementById("listChildren");
    // create a bigass list, then append it to the main content div
    for(var i = 0; i < 24; i++) {
        // here we can format our event objects in any way we like. for now im just appending them to a one-line string
        var li = document.createElement('li');
        li.innerHTML = obj[i].event_title + ", " + obj[i].address_id + ", " + obj[i].start_date_time;
        ul.appendChild(li);
    }

}

function loadFilters() {    
    var months = {
        jan: "January",
        feb: "February",
        mar: "March",
        apr: "April",
        may: "May",
        june: "June",
        july: "July",
        aug: "August",
        sep: "September",
        oct: "October",
        nov: "November",
        dec: "December"
    };
    var selectBox = document.getElementById("monthTextBox");
    for(var index in months) {
        console.log('inside the month loop, val is: ' + index + 'innerhtml is: ' + months[index]);
        var op = document.createElement('option');
        var val = document.createTextNode(months[index]);
        op.appendChild(val);
        op.setAttribute('value', 'index');
        op.setAttribute('class', 'listOption');
        selectBox.appendChild(op);
    }
}



