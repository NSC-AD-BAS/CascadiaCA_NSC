/**
 * Created by cdub on 6/4/2016.
 */
var calShowing = false;
var dateTimeFromForm;

function swapCalendar(calBtn) {
    calBtn.addEventListener('click', function(){
        console.log("calshowing is: " + calShowing);
        if(calShowing == false) {
            document.getElementById("eventContent").setAttribute("class", "hidden");
            document.getElementById("detailContent").setAttribute("class", "hidden");
            document.getElementById("calendarContent").setAttribute("class", "showing");
            calShowing = !calShowing;
        }
        else {
            document.getElementById("eventContent").setAttribute("class", "showing");
            //document.getElementById("detailContent").setAttribute("class", "hidden");
            document.getElementById("calendarContent").setAttribute("class", "hidden");
            calShowing = !calShowing;
        }
    }, false);
}

function resetDates(btn) {
    btn.addEventListener('click', function(){
        console.log('resetDates');
    }, false);
}

function resetAll(btn) {
    // TODO: clear all values from all drop down lists
    btn.addEventListener('click', function(){
        console.log('reset');
    }, false)
}

function search(btn) {
    // TODO: get all values from the drop down lists, and dateTimes, add to an array, and process an ajax request
    btn.addEventListener('click', function(){
        console.log('search filters');
        //var type = document.getElementById("")
    }, false)
}

function createNew(btn) {
    btn.addEventListener('click', function(){
        // add functionality to tie in with duri and sam's form submission
        console.log('create new');
}, false)
}

function dateTimeSaver(dateTime) {
    dateTimeFromForm = dateTime;
    // TODO: store this for putting into our array of filter items selected
}
