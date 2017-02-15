"use strict";

/* Start of local variables */
var calender = $('#calender');
var noteWindow = $('#note_window');
var addNoteButton = noteWindow.find('.add_note');
var monthTitle = calender.find('.title');
var templateDay = calender.find('.template').clone();
var container = calender.find('.container');
var todayDate = new Date();
var currentMonth;
var currentYear;
var targetDay = 0;
var notes = new NoteStorage();
var dayNotes = [];
const hebMonth = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
];
/* End of local variables */



$(document).ready(function () {
    initCalender();
    initNoteWindow();
    drawCalender();
});



/* Initialize functions: */

function initCalender(){
    calender.find('.template').remove();
    currentMonth = todayDate.getMonth();
    currentYear = todayDate.getFullYear();
}

function initNoteWindow(){
    addListenerToCloseWindow();
    addListenerToAddButton();
}




/* Draw functions: */

function drawCalender(){
    container.empty();
    monthTitle.text(currentYear + " " +hebMonth[currentMonth]);
    let numberOfDays = getNumberOfDaysInMonth(currentYear, currentMonth+1);

    for (let i = 1; i <= numberOfDays; i++){
        if (isDateOfToday(currentYear, currentMonth, i)){
            createNewCurrentDay(i);
        } else {
            createNewEmptyDay(i);
        }
    }
}

function drawNoteWindow(day, content, isHideButton){
    let dateString = day+"/"+parseInt(currentMonth+1)+ "/"+currentYear;
    dayNotes = notes.getContentOfDate(dateString);
    noteWindow.find('.note').val(content);
    noteWindow.find('.title').text(dateString);

    if (isHideButton){
        addNoteButton.hide();
    }

    noteWindow.fadeIn(200);
}

function redrawDay(day, date){
    let note = day.find('.note');
    note.empty();
    dayNotes = notes.getContentOfDate(date);
    date = date.split('/');

    for(let i = 0; i < dayNotes.length; i++){
        drawNewNote(date[0], note, i);
    }
}

function drawNewNote(day, note, i) {
    let newImg = $('<img id="img_note_'+i+'" class="img_note">');
    newImg.attr("day", day);
    note.append(newImg);
    note.find('#img_note_'+i).click(function (event) {
        drawNoteWindow(day, dayNotes[i], true);
        event.stopPropagation();
    });

    note.find('#img_note_'+i).hover(function () {
        let date = parseInt($(this).attr("day"))+"/"+
            parseInt(currentMonth+1)+ "/"+currentYear;
        dayNotes = notes.getContentOfDate(date);
    });
}




/* clones functions: */

function createNewEmptyDay(i){
    let newDay = createNewDay(i);
    newDay.attr('class', 'empty_day');
}

function createNewCurrentDay(i) {
    let newDay = createNewDay(i);
    newDay.attr('class', 'current_day');
}

function createNewDay(i) {
    let newDay = templateDay.clone();
    newDay.find('.day').text(i);
    newDay.find('.note').text('');
    newDay.attr('day', i);
    newDay.attr('id', 'day_'+i);
    addListenerToDay(newDay);
    container.append(newDay);
    return newDay;
}



/* Listeners functions: */

function addListenerToDay(day){
    day.click(function () {
        targetDay = $(this).attr("day");
        addNoteButton.show();
        drawNoteWindow(targetDay, '');
    });
}


function addListenerToCloseWindow() {
    noteWindow.find('.close').click(function () {
        noteWindow.fadeOut(200);
    });
}

function addListenerToAddButton() {
    noteWindow.find('.add_note').click(function () {
        let date = noteWindow.find('.title').text();
        let content = noteWindow.find('.note').val();
        notes.addNote(new Note(date, content));
        let dateArr = date.split('/');
        let day = container.find('#day_'+dateArr[0]);
        redrawDay(day, date);
        noteWindow.fadeOut(200);
    });
}



/* Date functions: */

function getNumberOfDaysInMonth(year, month){
    return new Date(year, month, 0).getDate();
}

function isDateOfToday(year, month, day){
    if (todayDate.getFullYear() !== year){
        return false;
    }

    if (todayDate.getMonth() !== month){
        return false;
    }

    if (todayDate.getDate() !== day){
        return false;
    }

    return true;
}