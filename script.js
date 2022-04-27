let nextRace = 0;
let data = "";
var date, date1, date2, date3, date4, obj;
let offset = new Date().getTimezoneOffset() /-60;

let api_url = "https://ergast.com/api/f1/current.json";


getNextRace();

async function getNextRace() {
    let r = await fetch('https://f1.boustany.tech/data.php');
    let d = await r.json();
    nextRace = await d.round_id;
    console.log(nextRace);
    getData(api_url);
}
// The data/time we want to countdown to
function setTimer(time, d, h, m, s, e) {

    var countDownDate = new Date(time).getTime();

    // Run myfunc every second
    var myfunc = setInterval(function () {

        var now = new Date().getTime();
        var timeleft = countDownDate - now;

        // Calculating the days, hours, minutes and seconds left
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        // Result is output to the specific element
        document.getElementById(d).innerHTML = days + "d "
        document.getElementById(h).innerHTML = hours + "h "
        document.getElementById(m).innerHTML = minutes + "m "
        document.getElementById(s).innerHTML = seconds + "s "

        // Display the message when countdown is over
        if (timeleft < 0) {
            clearInterval(myfunc);
            document.getElementById(d).innerHTML = ""
            document.getElementById(h).innerHTML = ""
            document.getElementById(m).innerHTML = ""
            document.getElementById(s).innerHTML = ""
            document.getElementById(e).innerHTML = "TIME UP!!";

        }
    }, 1000);
}

function clearTimer() {
    document.getElementById("e1").innerHTML = "";
    document.getElementById("e2").innerHTML = "";
    document.getElementById("e3").innerHTML = "";
    document.getElementById("e4").innerHTML = "";
    document.getElementById("end").innerHTML = "";
}

function getTime(dte,t) {
    let y = dte.split("-")[0];
    let m= dte.split("-")[1];
    let d= dte.split("-")[2];
    let time1 = t.replace('Z', ' ');
    let timegmt = Number(time1.split(":")[0]);
    timegmt += offset;
    let time = timegmt + ":" + time1.split(":")[1] + ":" + time1.split(":")[2];
    return m + " " + d + ", " + y + " " + time;
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

async function getData(file) {
    let result = await fetch(file, requestOptions);
    let dt = await result.json();
    data = dt.MRData;
    var x = data.RaceTable.Races[nextRace].date;
    var y = data.RaceTable.Races[nextRace].time;
    document.getElementById("race").innerHTML = data.RaceTable.Races[nextRace].raceName;

    date = getTime(x,y);
    setTimer(date, "days", "hours", "mins", "secs", "end");

    var season = data.RaceTable.Races[nextRace].season;
    document.getElementById("season").innerHTML = "Season: " + season;

    var round = data.RaceTable.Races[nextRace].round;
    document.getElementById("round").innerHTML = "Grand Prix: " + round;

    var url = data.RaceTable.Races[nextRace].url;
    document.getElementById("url").innerHTML = "More Info";
    document.getElementById("url").href = url;

    var circuitId = data.RaceTable.Races[nextRace].Circuit.circuitId;
    document.getElementById("circuitId").innerHTML = "Circuit Id: " + circuitId;

    var circuitName = data.RaceTable.Races[nextRace].Circuit.circuitName;
    document.getElementById("circuitName").innerHTML = "Circuit Name: " + circuitName;

    var country = data.RaceTable.Races[nextRace].Circuit.Location.country;
    document.getElementById("country").innerHTML = "Country: " + country;

    var lat = data.RaceTable.Races[nextRace].Circuit.Location.lat;
    document.getElementById("lat").innerHTML = "lattitude: " + lat;

    var long = data.RaceTable.Races[nextRace].Circuit.Location.long;
    document.getElementById("long").innerHTML = "longitude: " + long;

    obj = data.RaceTable.Races[nextRace];
    obj = Object.values(obj);

    date1 = getTime(obj[7].date,obj[7].time);
    setTimer(date1, "d1", "h1", "m1", "s1", "e1");

    date2 = getTime(obj[8].date,obj[8].time);
    setTimer(date2, "d2", "h2", "m2", "s2", "e2");

    date3 = getTime(obj[9].date,obj[9].time);
    setTimer(date3, "d3", "h3", "m3", "s3", "e3");

    date4 = getTime(obj[10].date,obj[10].time);
    setTimer(date4, "d4", "h4", "m4", "s4", "e4");

    var sprint = data.RaceTable.Races[nextRace].Sprint;
    if (sprint) {
        document.getElementById("timing1").innerHTML = "1st Practice: " + date1;
        document.getElementById("timing2").innerHTML = "Qualification: " + date2;
        document.getElementById("timing3").innerHTML = "2nd Practice: " + date3;
        document.getElementById("timing4").innerHTML = "Sprint : " + date4;
    } else {
        document.getElementById("timing1").innerHTML = "1st Practice: " + date1;
        document.getElementById("timing2").innerHTML = "2nd Practice: " + date2;
        document.getElementById("timing3").innerHTML = "3rd Practice: " + date3;
        document.getElementById("timing4").innerHTML = "Qualification: " + date4;
    }
}

if(document.getElementById("end").innerHTML === "TIME UP!!") {
    clearTimer();
}
