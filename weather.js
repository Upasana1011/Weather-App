 let key="fd186cd4d551367714743d5a964302bd";
 let disp=document.getElementById("disp");
 document.getElementById("btn").addEventListener("click",getweather);
     async function getweather(){
         try{
           
            let city=document.getElementById("name").value;
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
            let url2=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=fd186cd4d551367714743d5a964302bd`;
            
            let res=await fetch(url);
            let data=await res.json();
            console.log("data is",data);
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            console.log(lon,lat);
            
            display(data)
            showmap(lat,lon);
            sevenday(url2);
            
         }
        // https://api.openweathermap.org/data/2.5/forecast?q=london&cnt=7&appid=fd186cd4d551367714743d5a964302bd
         catch(err){
              console.log("error is: "+err);
         }
         finally{
            console.log("completed")
         }
     }
     function display(data){
       disp.innerHTML=null;
       let city=document.getElementById("name").value;
       let main=document.createElement("div");
       let nm=document.createElement("h1");
       let weather=document.createElement("img");
       weather.style.height="100px";
       weather.style.width="100px";
       let mintemp=document.createElement("h3");
       let maxtemp=document.createElement("h3");
       let rise=document.createElement("h3");
       let set=document.createElement("h3");
       let wind=document.createElement("h3");
       nm.textContent="City: "+city;
       weather.src=`http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
       mintemp.textContent="Min Temp: "+data.main.temp_min;
       maxtemp.textContent="Max Temp: "+data.main.temp_max;
       rise.textContent="Sunrise: "+data.sys.sunrise;
       set.textContent="Sunset: "+data.sys.sunset;
       wind.textContent="Wind Speed: "+data.wind.speed;
       main.append(nm,weather,mintemp,maxtemp,rise,set,wind);
        disp.append(main)
     }

function showmap(lat,lon) {
   let posn = {lat: lat, lng: lon};
   console.log(posn);
   let map = new google.maps.Map(
         document.getElementById('map'), {
             center: posn,
             zoom: 8
   });
   let Marker = new google.maps.Marker({position:posn, map:map})
}
 var script = document.createElement("script");
 script.src= "https://maps.googleapis.com/maps/api/js?key=AIzaSyBXiHgksUDGNPgihGXk4KnrMVg8pHdup8o";

document.getElementById("map").append(script);




async function sevenday(url2){
   try{
      
      var resp = await fetch(url2);
      var data =await resp.json();
      console.log("data--",data);
      displ(data.list);
   }
   catch(err){
      console.log("error is:",err)
   }
   finally{
      console.log("completed")
   }
}
let bigdiv=document.getElementById("box2");
function displ(data){
   data.forEach(element => {
      // bigdiv.innerHTML=null;
      var box=document.createElement("div");
      box.style.backgroundColor="rgb(94, 150, 223)";
      let h1=document.createElement("img");
      h1.src=`http://openweathermap.org/img/w/${element.weather[0].icon}.png`;
      let h2=document.createElement("h3");
      h2.textContent=element.wind.deg;
      let h3=document.createElement("h3");
      h3.textContent=element.main.temp;
      let h4=document.createElement("h3");
      h4.textContent=element.wind.speed;
      box.append(h3,h1,h2,h4);
      bigdiv.append(box)
   });
}
