/* VARIABLES CODE STARTS */

//Stopwatch section variables
const stopwatchTime = document.querySelector(".time");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
let stopwatchId;
let stopwatchFlag = 0;
let totalStopwatchTime,prevStopwatchTime;
let isStopwatchFirst = 0;
//Navigation variables
const headerTimer = document.querySelector(".header-timer");
const headerStopwatch = document.querySelector(".header-stopwatch");
const sectionTimer = document.querySelector(".timer");
const sectionStopwatch = document.querySelector(".stopwatch");
//Timer section variables
const timerHours = document.querySelector(".timer .hours");
const timerMinutes = document.querySelector(".timer .minutes");
const timerSeconds = document.querySelector(".timer .seconds");
const timerTime = document.querySelector(".timer .time");
let timerId;
let timerFlag = 0;
let totalTimerDuration;
let isTimerFirst = 0;
let timerStartTime;
//Timer input variables
const timerInput = document.querySelector(".timer-input");
const setTimeBtn = document.querySelector(".settime-btn");
const goBackBtn = document.querySelector(".goback-btn");
const secondsInput = document.querySelector(".seconds-input");
const minutesInput = document.querySelector(".minutes-input");
const hoursInput = document.querySelector(".hours-input");
//Animation variables
const circle = document.querySelector(".timer circle");
let totalTimerDurationDup;

/* VARIABLES CODE ENDS */

/* THE BELOW IF-ELSE DISPLAY THE STOPWATCH SECTION OR TIMER SECTION BASED ON LOCALSTORAGE => STARTS */

if((window.localStorage.getItem("isStopwatch") === "1") || (window.localStorage.getItem("isStopwatch") === null)) {
    sectionStopwatch.classList.remove("indisplay-section");
    sectionTimer.classList.add("indisplay-section");
    headerTimer.classList.remove("bold");
    headerStopwatch.classList.add("bold");
}
else {
    sectionStopwatch.classList.add("indisplay-section");
    sectionTimer.classList.remove("indisplay-section");
    headerTimer.classList.add("bold");
    headerStopwatch.classList.remove("bold");
}

/* THE ABOVE IF-ELSE DISPLAY THE STOPWATCH SECTION OR TIMER SECTION BASED ON LOCALSTORAGE => ENDS */



/* BEGIN OF STOPWATCH FUNCTIONS */

// 1).setStopWatchTime Function
const setStopWatchTime = (param) => {
    let totalStopwatchTimeInSec = Math.floor(param/1000);

    let sms = Math.floor((param % 1000) / 10);
    if(sms < 10) sms = `0${sms}`;

    let sh = Math.floor(totalStopwatchTimeInSec / 3600);
    if(sh < 10) sh = `0${sh}`;
    
    let sm = Math.floor((totalStopwatchTimeInSec - (Math.floor(totalStopwatchTimeInSec / 3600) * 3600))/ 60);
    if(sm < 10) sm = `0${sm}`;

    let ss = totalStopwatchTimeInSec % 60;
    if(ss < 10) ss = `0${ss}`;

    stopwatchTime.innerHTML = `
        ${sh}<span class="label">h</span>
        ${sm}<span class="label">m</span>
        ${ss}<span class="label">s</span>
        ${sms}<span class="label">ms</span>
    `;
}
// 2).stopwatchTick function
const stopwatchTick = () => {
    let stopwatchStartTime = parseInt(window.localStorage.getItem("stopwatchStartTime"));
    let currentTime = new Date().getTime();
    prevStopwatchTime = parseInt(window.localStorage.getItem("totalStopwatchTime"));
    if(window.localStorage.getItem("isStopwatchResume") === "1") {
        totalStopwatchTime = (currentTime - stopwatchStartTime) + prevStopwatchTime;
        window.localStorage.setItem("isStopwatchResumeDup","1");
        window.localStorage.removeItem("isStopwatchResume");
    }
    else if(window.localStorage.getItem("isStopwatchResumeDup")){
        totalStopwatchTime = (currentTime - stopwatchStartTime) + prevStopwatchTime;
    }
    else {
        totalStopwatchTime = (currentTime - stopwatchStartTime);
    }
    setStopWatchTime(totalStopwatchTime);
}
// 3).startStopWatch function - can be refactored
const startStopWatch = () => {
    stopwatchFlag = 1;
    window.localStorage.setItem("isStopwatchRunning","1");
    if(isStopwatchFirst === 0) {
        window.localStorage.setItem("stopwatchStartTime",new Date().getTime());
    }
    if(window.localStorage.getItem("isStopwatchResume")) {
        window.localStorage.setItem("stopwatchStartTime",new Date().getTime());
    }
    startBtn.textContent = "pause";
    startBtn.classList.add("orange");
    stopwatchId = setInterval(stopwatchTick,10);
}

/* THE BELOW IF-ELSE RUNS THE STOPWATCH IF IT IS STARTED => STARTS */

if(window.localStorage.getItem("isStopwatchRunning") !== null) {
    isStopwatchFirst++;
    if(window.localStorage.getItem("isStopwatchResume") === null) {
        startStopWatch();
    }
    else {
        startBtn.textContent = "resume";
        startBtn.classList.add("orange");
        setStopWatchTime(parseInt(window.localStorage.getItem("totalStopwatchTime")));
    }
}

/* THE ABOVE IF-ELSE RUNS THE STOPWATCH IF IT IS STARTED => ENDS */

// 4).resetStopwatch function - can be refactored
const resetStopwatch = () => {
    stopwatchTime.innerHTML = `
        00<span class="label">h</span>
        00<span class="label">m</span>
        00<span class="label">s</span>
        00<span class="label">ms</span>
    `;
    stopwatchFlag = 0;
    isStopwatchFirst = 0;
    window.localStorage.removeItem("isStopwatchRunning");
    window.localStorage.removeItem("totalStopwatchTime");
    window.localStorage.removeItem("stopwatchStartTime");
    window.localStorage.removeItem("isStopwatchResume");
    window.localStorage.removeItem("isStopwatchResumeDup");
    clearInterval(stopwatchId);
    startBtn.textContent = "start";
    startBtn.classList.remove("orange");
}
// 5).resumeStopwatch function
const resumeStopwatch = () => {
    window.localStorage.setItem("isStopwatchResume","1");
    window.localStorage.setItem("totalStopwatchTime",totalStopwatchTime);
    stopwatchFlag = 0;
    startBtn.textContent = "resume";
    clearInterval(stopwatchId);
}

/*END OF STOPWATCH FUNCTIONS*/



/* BEGIN OF TIMER FUNCTIONS */

// 1).setTimerTime function
const setTimerTime = (param) => {
    let totalTimerDurationInSec = Math.ceil(param / 1000);
    let th = Math.floor(totalTimerDurationInSec / 3600);
    let tm = Math.floor((totalTimerDurationInSec - (th * 3600)) / 60);
    let ts = totalTimerDurationInSec % 60;

    if(ts < 10) timerSeconds.textContent = `0${ts}`;
    else timerSeconds.textContent = `${ts}`;
    
    if(tm < 10) timerMinutes.textContent = `0${tm}`;
    else timerMinutes.textContent = `${tm}`;

    if(th < 10) timerHours.textContent = `0${th}`;
    else timerHours.textContent = `${th}`;
}
// 2).timerTick function
const timerTick = () => {
    let ttd = parseInt(window.localStorage.getItem("totalTimerDuration"));
    let ttdd = parseInt(window.localStorage.getItem("totalTimerDurationDup"));
    ttd = ttd - 10;
    window.localStorage.setItem("totalTimerDuration",ttd);
    if(ttd < 0) {
        timerSeconds.textContent = "00";
        timerMinutes.textContent = "00";
        timerHours.textContent = "00";
        timerFlag = 0;
        clearInterval(timerId);
        startBtn.textContent = "start";
        startBtn.classList.remove("orange");
        circle.setAttribute("stroke-dashoffset",-753.6);
        // the below code send one notification
        chrome.notifications.create("timer",{
            type : "basic",
            iconUrl : "icon48.png",
            title : "SAT",
            message : "It Looks Like Your Timer Ended.",
            priority : 2
        });
    }
    else {
        circle.setAttribute("stroke-dashoffset",753.6 * (ttd/ttdd) - 753.6);
        if((ttd/ttdd) <= 0.5) circle.setAttribute("stroke","orange");
        if((ttd/ttdd) <= 0.25) circle.setAttribute("stroke","red");
        setTimerTime(ttd);
    }
}
// 3).startTimer function
const startTimer = () => {
    timerFlag = 1;
    startBtn.textContent = "pause";
    startBtn.classList.add("orange");
    window.localStorage.setItem("isTimerRunning","1");
    window.localStorage.removeItem("isTimerResume");
    if(window.localStorage.getItem("timerResumeStartPoint") !== null) {
        window.localStorage.setItem("timerResumeEndPoint",new Date().getTime());
    }
    if(isTimerFirst === 0) {
        totalTimerDuration = 600000;
        totalTimerDurationDup = totalTimerDuration;
        window.localStorage.setItem("totalTimerDuration",totalTimerDuration);
        window.localStorage.setItem("totalTimerDurationDup",totalTimerDurationDup);
        timerStartTime = new Date().getTime();
        window.localStorage.setItem("timerStartTime",timerStartTime);
        window.localStorage.removeItem("timerResumeStartPoint");
        window.localStorage.removeItem("timerResumeEndPoint");
        timerId = setInterval(timerTick,10);
    }
    else if(isTimerFirst === -999){
        timerId = setInterval(timerTick,10);
        timerStartTime = new Date().getTime();
        window.localStorage.setItem("timerStartTime",timerStartTime);
        window.localStorage.removeItem("timerResumeStartPoint");
        window.localStorage.removeItem("timerResumeEndPoint");
    }
    else timerId = setInterval(timerTick,10);
}
/* THE BELOW IF-ELSE RUNS THE TIMER IF IT IS STARTED => STARTS */

if(window.localStorage.getItem("isTimerRunning") !== null) {
    isTimerFirst++;
    let ttd = parseInt(window.localStorage.getItem("totalTimerDuration"));
    let ttdd = parseInt(window.localStorage.getItem("totalTimerDurationDup"));
    if(window.localStorage.getItem("isTimerResume") === null) {
        let tst = parseInt(window.localStorage.getItem("timerStartTime"));
        let trep = 0,trsp = 0;
        if(window.localStorage.getItem("timerResumeStartPoint") !== null) {
            trsp = parseInt(window.localStorage.getItem("timerResumeStartPoint"));
        }
        if(window.localStorage.getItem("timerResumeEndPoint") !== null) {
            trep = parseInt(window.localStorage.getItem("timerResumeEndPoint"));
        }
        let calculatedTimerTime = (ttd - (new Date().getTime() - (tst + (ttdd - ttd)))) + (trep - trsp);
        window.localStorage.setItem("totalTimerDuration",calculatedTimerTime);
        startTimer();
    }
    else {
        startBtn.textContent = "resume";
        startBtn.classList.add("orange");
        circle.setAttribute("stroke-dashoffset",753.6 * (ttd/ttdd) - 753.6);
        if((ttd/ttdd) <= 0.5) circle.setAttribute("stroke","orange");
        if((ttd/ttdd) <= 0.25) circle.setAttribute("stroke","red");
        setTimerTime(ttd);
    }
}

/* THE ABOVE IF-ELSE RUNS THE TIMER IF IT IS STARTED => ENDS */

// 4).resetTimer function - can be refactored
const resetTimer = () => {
    timerSeconds.textContent = "00";
    timerMinutes.textContent = "10";
    timerHours.textContent = "00";
    secondsInput.value = "00";
    minutesInput.value = "10";
    hoursInput.value = "00";
    timerFlag = 0;
    totalTimerDuration = 600000;
    totalTimerDurationDup = 600000;
    window.localStorage.setItem("totalTimerDuration",totalTimerDuration);
    window.localStorage.setItem("totalTimerDurationDup",totalTimerDurationDup);
    isTimerFirst = 0;
    clearInterval(timerId);
    window.localStorage.removeItem("isTimerRunning");
    window.localStorage.removeItem("isTimerResume");
    window.localStorage.removeItem("timerStartTime");
    window.localStorage.removeItem("timerResumeStartPoint");
    window.localStorage.removeItem("timerResumeEndPoint");
    startBtn.textContent = "start";
    startBtn.classList.remove("orange");
    circle.setAttribute("stroke-dashoffset",0);
    circle.setAttribute("stroke","green");
}
// 5).resumeTimer function
const resumeTimer = () => {
    isTimerFirst++;
    timerFlag = 0;
    window.localStorage.setItem("isTimerResume","1");
    window.localStorage.setItem("timerResumeStartPoint",new Date().getTime());
    startBtn.textContent = "resume";
    clearInterval(timerId);
}

/* END OF TIMER FUNCTIONS */



/* EVENT LISTENER CODE STARTS */

// Start Button Event Listener
startBtn.addEventListener("click",(e) => {
    if((window.localStorage.getItem("isStopwatch") === "1") || (window.localStorage.getItem("isStopwatch") === null)) {
        if(stopwatchFlag == 0) startStopWatch();
        else resumeStopwatch();
    }
    else {
        if(timerFlag == 0) {
            if(totalTimerDuration !== 0) startTimer();
        }
        else resumeTimer();
    }
});

// Reset Button Event Listener
resetBtn.addEventListener("click",(e) => {
    if((window.localStorage.getItem("isStopwatch") === "1") || (window.localStorage.getItem("isStopwatch") === null))
        resetStopwatch();
    else resetTimer();
});

// Header Timer Event Listener - can be refactored
headerTimer.addEventListener("click",(e) => {
    window.localStorage.setItem("isStopwatch","0");
    resetStopwatch();
    sectionStopwatch.classList.add("indisplay-section");
    sectionTimer.classList.remove("indisplay-section");
    headerTimer.classList.add("bold");
    headerStopwatch.classList.remove("bold");
});

// Header Stopwatch Event Listener - can be refactored
headerStopwatch.addEventListener("click",(e) => {
    window.localStorage.setItem("isStopwatch","1");
    resetTimer();
    sectionStopwatch.classList.remove("indisplay-section");
    sectionTimer.classList.add("indisplay-section");
    headerTimer.classList.remove("bold");
    headerStopwatch.classList.add("bold");
});

// Timer Section Time Event Listener
timerTime.addEventListener("click",(e) => {
    timerInput.classList.add("display-timer-input");
});

// Timer Input Section goBack Button Event Listener
goBackBtn.addEventListener("click",() => {
    timerInput.classList.remove("display-timer-input");
});

// Timer input Section Seconds Input Event Listener
secondsInput.addEventListener("input",(e) => {
    for(let i = 0; i < e.target.value.length; i++)
        if(isNaN(parseInt(e.target.value[i]))) e.target.value = "00";
    if(!(parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 59) && e.target.value !== "")
        e.target.value = "00";
});

// Timer input Section Minutes Input Event Listener
minutesInput.addEventListener("input",(e) => {
    for(let i = 0; i < e.target.value.length; i++)
        if(isNaN(parseInt(e.target.value[i]))) e.target.value = "00";
    if(!(parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 59) && e.target.value !== "")
        e.target.value = "00";
});

// Timer input Section Hours Input Event Listener
hoursInput.addEventListener("input",(e) => {
    for(let i = 0; i < e.target.value.length; i++)
        if(isNaN(parseInt(e.target.value[i]))) e.target.value = "00";
    if(!(parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 59) && e.target.value !== "")
        e.target.value = "00";
});

// Timer Input Section setTime Button Event Listener
setTimeBtn.addEventListener("click",(e) => {
    isTimerFirst = -999;
    timerFlag = 0;
    window.localStorage.removeItem("isTimerRunning");
    window.localStorage.removeItem("isTimerResume");
    window.localStorage.removeItem("timerStartTime");
    window.localStorage.removeItem("timerResumeStartPoint");
    window.localStorage.removeItem("timerResumeEndPoint");
    clearInterval(timerId);
    startBtn.textContent = "start";
    startBtn.classList.remove("orange");
    circle.setAttribute("stroke-dashoffset",0);
    circle.setAttribute("stroke","green");

    if(secondsInput.value.trim() == "") secondsInput.value = "00";
    if(minutesInput.value.trim() == "") minutesInput.value = "00";
    if(hoursInput.value.trim() == "") hoursInput.value = "00";

    if(parseInt(secondsInput.value) < 10) timerSeconds.textContent = "0" + parseInt(secondsInput.value);
    else timerSeconds.textContent = secondsInput.value;

    if(parseInt(minutesInput.value) < 10) timerMinutes.textContent = "0" + parseInt(minutesInput.value);
    else timerMinutes.textContent = minutesInput.value;

    if(parseInt(hoursInput.value) < 10) timerHours.textContent = "0" + parseInt(hoursInput.value);
    else timerHours.textContent = hoursInput.value;

    timerInput.classList.remove("display-timer-input");
    totalTimerDuration = (parseInt(secondsInput.value)+(parseInt(minutesInput.value)*60)+(parseInt(hoursInput.value)*3600))*1000;
    totalTimerDurationDup = totalTimerDuration;
    window.localStorage.setItem("totalTimerDuration",totalTimerDuration);
    window.localStorage.setItem("totalTimerDurationDup",totalTimerDurationDup);
});

/* EVENT LISTENER CODE ENDS */