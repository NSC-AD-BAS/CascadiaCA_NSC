/**
 * Created by cdub on 6/4/2016.
 */
var calShowing = false;

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
    btn.addEventListener('click', function(){
        console.log('reset');
    }, false)
}

function search(btn) {
    btn.addEventListener('click', function(){
        console.log('search filters');
    }, false)
}

function createNew(btn) {
    btn.addEventListener('click', function(){
        console.log('create new');
    }, false)
}
