let cityURL = "http://localhost:2020/city";
let hotelURL = "https://developerfunnel.herokuapp.com/hotels?city=";

function mode(){

    var myBody = document.body;
    var myBulb = document.getElementById('bulb');

    myBulb.classList.toggle('fas');
    myBody.classList.toggle('dark');
}


let openCoupon = () =>{
    document.getElementById('coupon').style.visibility = 'visible';
}

let closeCoupon = () =>{
    document.getElementById('coupon').style.visibility = 'hidden';
}

function citySelect(){
    fetch(cityURL)
    .then((res) => res.json())
    .then((data) => {
        for(i=0;i < data.length;i++){
            let element = document.createElement('option');
            let cityName = document.createTextNode(data[i].city_name);
            element.appendChild(cityName);
            element.value = data[i]._id;

            document.getElementById('citySelect').appendChild(element);
        }
    })
}


function getHotel(){
    const cityId = document.getElementById('citySelect').value;
    while(hotelSelect.length>0){
        hotelSelect.remove(0);
    }

    fetch(`${hotelURL}${cityId}`)
    .then((res) => res.json())
    .then((data) => {
        for(i=0;i < data.length;i++){
            let element = document.createElement('option');
            let hotelName = document.createTextNode(`${data[i].name}, ${data[i].city_name}`)
            element.appendChild(hotelName);

            document.getElementById('hotelSelect').appendChild(element);
        }
    })
}


function geolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        console.log('Geolocation is not Supported in this Device.')
    }
}

showPosition = (data) =>{
    let x = document.getElementById('location');
    let y = document.getElementById('weatherIcon');
    // x.innerText=`Latitude is ${data.coords.latitude}, longitude is ${data.coords.longitude}`
    let lat = data.coords.latitude;
    let long = data.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=1&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        data.list.map((item) =>{
            console.log(item.temp.day);
            x.innerText = `${item.temp.day}°C and ${item.weather[0].description}`;
            y.innerHTML = `<img class='card-img-top' src='https://openweathermap.org/img/w/${item.weather[0].icon}.png' alt='weather'/>`
        })
    })
}