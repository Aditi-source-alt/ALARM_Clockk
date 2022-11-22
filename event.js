let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("Alarm.mp3");

function updateClock(){
    var now = new Date();
    var dname = now.getDay()
        mon = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hour = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        ampm = "AM";

        if(hour==0){
            hour = 12;
        }

        if(hour>12){
            hour -=12;
            ampm = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var week = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
        var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname], months[mon], dnum.pad(2),yr,hour.pad(2),min.pad(2),sec.pad(2),ampm];

        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }
     
        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${week[dname]} ${hour.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${ampm}`){
                console.log("Alarm ringing...");
                ring.load();
                ring.play();
                document.querySelector("#stopAlarm").style.visibility= "visible";
            }
        }
      
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}

for(let i=0; i<7;i++){
    let days = ['Sat','Fri','Thur','Wed','Tues','Mon','Sun']
    let option = `<option value="${days[i]}">${days[i]}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = ` ${selectMenu[0].value} ${selectMenu[1].value}:${selectMenu[2].value}:00 ${selectMenu[3].value}`;
    if(time.includes("setDay") || time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valid Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
            <button class="btn-snooze" id="${alarmCount}" onClick="snooze(this.id)">Snooze 5 minutes</button>

        </div>`;

        alarmTime = `${selectMenu[0].value} ${selectMenu[1].value}:${selectMenu[2].value}:00 ${selectMenu[3].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }

}

setAlarmBtn.addEventListener("click",setAlarm);

function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
   element.remove();
}

function snooze(click_id){
    var interval = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
        alarmListArr[interval] = snoozeAlarm();
        
   
}
function snoozeAlarm(){
    stopAlarm();
   let count = 1;
   let interval = setInterval(()=>{
    console.log('snooze ringing only 3 times at an interval of 5 min.')
    ring.play();
    document.querySelector("#stopAlarm").style.visibility= "visible";
    count++;
    if(count>3) clearInterval(interval);
   },300000);
}


function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}
