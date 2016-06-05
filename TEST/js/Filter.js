/**
 * Created by cdub on 6/4/2016.
 */

function swapCalendar(calBtn) {
    console.log("setting cal handler");
    calBtn.addEventListener('click', function(){
        console.log('switched to calendar');
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
