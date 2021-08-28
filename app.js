let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

var l_day = ''
var l_month = ''
var l_year = ''

generateCalendar = (month, year) => {

    l_month = month;
    l_year = year;


    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.setAttribute('id',`${i}`)
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }

        day.onclick = function () {
            l_day = i - first_day.getDay() + 1;
            document.getElementById('cd').style.display = 'none';
            document.getElementById('assign').style.display = 'block';
            
        }
        
        calendar_days.appendChild(day)
    }
}




let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}



let dark_mode_toggle = document.querySelector('.dark-mode-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}


///////////////////////
function tshow () {
    document.getElementById('forteacher').style.display = 'block';
    document.getElementById('forstudent').style.display = 'none';
}
function sshow () {
    document.getElementById('forteacher').style.display = 'none';
    document.getElementById('forstudent').style.display = 'block';
    let obj = JSON.parse(localStorage.getItem(`${l_day}${l_month}${l_year}`))
    if(obj!==null){
        document.getElementById('filename').innerText = obj.filename;
        document.getElementById('topicname').innerText = obj.tname;
        document.getElementById('teachername').innerText = obj.name;
        document.getElementById('message').innerText = obj.mess;
        document.getElementById('date').innerText = `${l_day}/${l_month}/${l_year}`;
        document.getElementById('subjectname').innerText = obj.sname;
    }
}

function closeme() {
    document.getElementById('assign').style.display = 'none';
    document.getElementById('cd').style.display = 'block'
}

var filename = '';
var tname = '';
var name = '';
var sname = '';
var mess = '';

document.getElementById('file').addEventListener('change',(e)=>{
    const selectedFile = e.target.files[0];
    filename = selectedFile.name;
})

    document.getElementById('sfile').addEventListener('change',(e)=>{
        const selectedFile = e.target.files[0];
        let obj = JSON.parse(localStorage.getItem(`${l_day}${l_month}${l_year}`))
        obj.list = [...obj.list,selectedFile.name];
        localStorage.setItem(`${l_day}${l_month}${l_year}`,JSON.stringify(
            obj
        ))
        console.log(obj);
    })

document.getElementById('tname').addEventListener('change',(e)=>{
    tname = e.target.value;
})
document.getElementById('name').addEventListener('change',(e)=>{
    name = e.target.value;
})
document.getElementById('mess').addEventListener('change',(e)=>{
    mess = e.target.value;
})
document.getElementById('sname').addEventListener('change',(e)=>{
    sname = e.target.value;
})

function submitme(){
    //  `${l_day}${l_month}${l_year}`
    localStorage.setItem(`${l_day}${l_month}${l_year}`,JSON.stringify({
        filename: filename,
        tname : tname,
        name: name,
        mess: mess,
        sname: sname,
        list: []
    }))
}



