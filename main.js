let hour = document.querySelector('.hour');
let min = document.querySelector('.min');
let sec = document.querySelector('.sec');

let setAlarmBtn = document.querySelector('.setAlarm');
let list = document.querySelector('#alarmContainer');
let currentTime = document.querySelector('.currentTime');

const ringtone = new Audio('ringtone.mp3');

let totalAlarm;
function ringAlarm(h,m,s,amPM) {
    totalAlarm = document.querySelectorAll('#alarmContainer div h3');
    let time = `${h} : ${m} : ${s} ${amPM}`;
    
    if(totalAlarm.length > 0) {
        for(let i=0; i<totalAlarm.length; i++) {
            if(time == totalAlarm[i].innerText) {
                ringtone.play();
                ringtone.loop = true;
                let element = totalAlarm[i].parentNode;
                list.removeChild(element);
                
                setTimeout(() => {
                    ringtone.pause();
                }, 10000);
            }
        }
    }
}


function displayTime(h,m,s) {
    let amPM ;
    if(h>=12){
        amPM = 'PM';
    }else{
        amPM = 'AM';
    }

    if(h==12){
        h = h;
    }
    else if(h>12){
        h = h%12;
    }
    h = h<10 ? "0"+h : h;
    m = m<10 ? "0"+m : m;
    s = s<10 ? "0"+s : s;
    currentTime.innerHTML = `<h2>${h} : ${m} : ${s} ${amPM}</h2>`;

    
    ringAlarm(h,m,s,amPM);
}                                                  

function clock() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    
      
    let hRotate = 30*h + m/2 + s/120;
    let mRotate = 6*m + s/10;
    let sRotate = 6*s;

    displayTime(h,m,s);
    
    hour.style.transform = `rotate(${hRotate}deg)`;
    min.style.transform = `rotate(${mRotate}deg)`;
    sec.style.transform = `rotate(${sRotate}deg)`;

}
setInterval(clock, 1000);
clock();

let select = document.querySelectorAll('.alarm select');
for(let i=1; i<=12;i++){
    i = i<10 ? "0"+i : i;
    let option = `<option value="${i}">${i}</option>`;
    select[0].lastElementChild.insertAdjacentHTML("afterend",option);      
}
for(let i=0; i<=59;i++){
    i = i<10 ? "0"+i : i;
    let option = `<option value="${i}">${i}</option>`;
    select[1].lastElementChild.insertAdjacentHTML("afterend",option);      
}
for(let i=0; i<=59;i++){
    i = i<10 ? "0"+i : i;
    let option = `<option value="${i}">${i}</option>`;
    select[2].lastElementChild.insertAdjacentHTML("afterend",option);      
}
for(let i=1; i<=2;i++){
    let amPM = i == 1 ? 'AM' : 'PM';
    let option = `<option value="${amPM}">${amPM}</option>`;
    select[3].lastElementChild.insertAdjacentHTML("afterend",option);
}

function enableInput() {
    select[0].value = 'hour';
        select[1].value = 'min';
        select[2].value = 'sec';
        select[3].value = 'amPM';
}

let alarmTime;
function setAlarm(){
     alarmTime = `${select[0].value} : ${select[1].value} : ${select[2].value}  ${select[3].value}`;
    if(alarmTime.includes('hour') || alarmTime.includes('min') || alarmTime.includes(sec) || alarmTime.includes('amPM') ) {
        alert("Fill the all inputs for set the alarm.")
    }
    else {
        let div = document.createElement('div');
        div.innerHTML = `<h3>${alarmTime}</h3>`;
        list.appendChild(div);
        
        
        enableInput();
    } 
}

setAlarmBtn.addEventListener('click',setAlarm);

