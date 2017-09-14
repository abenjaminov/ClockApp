var currHourString = "00";
var currMinString = "00";
var currSecString = "00";
var currHour = 0;
var currMin = 0;
var currSec = 0;

var targetHour = -1;
var targetMin = -1;
var targetSec = -1;

var labelDOM;
var clockInterval;

var hourTargetDOM;
var minuteTargetDOM;
var secondTargetDOM;

var MAX_TIME_PART_VALUE = 60;

var currentClockColor = "Red";

function resetClock() {
    stopClock();
    currHourString = "00";
    currMinString = "00";
    currSecString = "00";
    currHour = 0;
    currMin = 0;
    currSec = 0;

    determineClockString();
}

function setClockColor(color) {
    currentClockColor = color;
    labelDOM.css("color", color);
}

function stopClock() {
    clearInterval(clockInterval);
    setClockColor("Black");
}

function determineTimePartString(timePartValue) {
    var currTimePartString = "";
    if(timePartValue < 10) {
        currTimePartString = "0" + timePartValue;
    } else {
        currTimePartString = timePartValue.toString();
    }

    return currTimePartString;
}

function determineClockString() {
    currSecString = determineTimePartString(currSec);
    currMinString = determineTimePartString(currMin);
    currHourString = determineTimePartString(currHour);

    labelDOM.text(currHourString + ":" + currMinString + ":" + currSecString);
}

function updateClock() {
    currSec = (currSec + 1) % MAX_TIME_PART_VALUE;

    if(currSec == 0) {
        currMin = (currMin + 1) % MAX_TIME_PART_VALUE;

        if(currMin == 0) {
            currHour = (currHour + 1) % MAX_TIME_PART_VALUE;
        }
    }

    determineClockString();
}

function startClock() {
    setClockColor("Red");
    clockInterval = setInterval(updateClock, 1000);
}

$(document).ready(function() {
    labelDOM = $("#clock_time");
    hourTargetDOM = $("#hourTarget");
    minuteTargetDOM = $("#minuteTarget");
    secondTargetDOM = $("#secondTarget");

    hourTargetDOM.val(00);
    minuteTargetDOM.val(00);
    secondTargetDOM.val(00);

    $("#start_clock").click(startClock);
    $("#stop_clock").click(stopClock);
    $("#reset_clock").click(resetClock);

    determineClockString();
});