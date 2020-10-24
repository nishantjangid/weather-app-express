const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const today = document.getElementById('day');
const todayDate = document.getElementById('today_date');

// Day
const getCurrentDay = () => {

    var weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thrusday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";
    let currentTime  = new Date();
    var day = weekDay[currentTime.getDay()];
    // console.log(day);
    return day;
}            
today.innerHTML = getCurrentDay();
console.log(today);

//Current Month
const getCurrentTime = () => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let now  = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    // var year = now.getFullYear();

    // console.log(month+" / "+ day);
    // http://api.openweathermap.org/data/2.5/weather?q=ajmer&appid=b16dc77fe6193af0d3c9e37bba76f3a1

    return `${date} ${month}`;
}
todayDate.innerHTML = getCurrentTime();

const getinfo = async(e) => {
    e.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = `Please write the name before search`;
        temp.innerText = "";
        temp_status.innerText = "";

    }
    else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=b16dc77fe6193af0d3c9e37bba76f3a1`;
            const response = await fetch(url);
            const data = await response.json();
            const dataArr = [data];
            temp.innerText = dataArr[0].main.temp;
            // temp_status.innerText = dataArr[0].weather[0].main;
            city_name.innerText = `${dataArr[0].name}, ${dataArr[0].sys.country}`;

            // to change the weather image
            const weatherMode = dataArr[0].weather[0].main;
            console.log(weatherMode);
            if(weatherMode == "Clear")
            {
                temp_status.innerHTML = "<i class='fa fa-sun'></i>";
            }
            else if(weatherMode == "Clouds"){
                temp_status.innerHTML = "<i class='fa fa-cloud'></i>";
            }
            else if(weatherMode == "Rain"){
                temp_status.innerHTML = "<i class='fa fa-cloud-rain'></i>";
            }
            // console.log(data);


        }
        catch{
        city_name.innerText = `Please enter the city name properly`;
        }
    }
    // alert(cityVal);
}

// http://api.openweathermap.org/data/2.5/weather?q=ajmer&appid=b16dc77fe6193af0d3c9e37bba76f3a1

submitBtn.addEventListener('click',getinfo);