import { useEffect, useState } from 'react';

import brokenclouds from './assets/brokenclouds.jpg';
import clearsky from './assets/clearsky.png';
import fewclouds from './assets/fewclouds.png';
import rain from './assets/rain.jpg';
import scatteredclouds from './assets/scatteredclouds.png';
import snow from './assets/snow.png';
import thunderstorm from './assets/thunderstorm.png';
import mist from './assets/mist.png';
import showerrain from './assets/showerrain.png';


function App() {


  const [icon,seticon]=useState("");
  const key="2210b9f1ec2d30883e7ac6114a35bcd3";
  const [city,setCity]=useState("");
  const [deg,setDeg]=useState(0);
  const [country,setCountry]=useState("");
  const [latitude,setLatitude]=useState();
  const [longitude,setLongitude]=useState();
  const [Humidity,setHuminity]=useState();
  const [wind,setWind]=useState();
  const [image,setImg]=useState();
const [search,setSearch]=useState(false);

  useEffect(()=>{
    async function checkWeather()
  {


    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
      const res=await fetch(url);
      let data=await res.json(); 
      setLatitude(data.coord.lat);
      setLongitude(data.coord.lon);
      setWind(data.wind.speed);
      setCountry(data.sys.country);
      setHuminity(data.main.humidity)
      setDeg(Math.floor((data.main.temp)));
      const weatherIconcode=data.weather[0].icon;
      seticon(weatherIconcode.toString())
    
      if(icon ==='01n'||icon==='01d')
      {
        setImg(clearsky);
      }
      else if(icon ==='02n'||icon==='02d')
      {
        setImg(brokenclouds);
      }
      else if(icon ==='03n'||icon==='03d')
      {
        setImg(fewclouds);
      }
      else if(icon ==='04n'||icon==='04d')
      {
        setImg(scatteredclouds);
      }
      else if(icon ==='09n'||icon==='09d')
      {
        setImg(rain);
      }
      else if(icon ==='10n'||icon==='10d')
      {
        setImg(showerrain);
      }
      else if(icon ==='13n'||icon==='13d')
      {
        setImg(snow);
      }
      else
      {
        setImg(mist);
      }
    }
    catch(error)
    {
      console.log("Error occured in fetching..."); 
    }
  }
  checkWeather();
  },[city,search]);

  const changesearch=()=>{
    setSearch(true);
  }

  
  function changeCity(e)
  {
    setCity(e.target.value);
  }
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={key}

  return (
    <>
      <div className='container'>
        <div className="head">
          <input type="text" value={city} onChange={changeCity}/>
          <abbr title='Double Click to Get Weather'><button onClick={changesearch} type='submit'>Search</button></abbr>
        </div>
        {city &&  <div className="weatherimg">
  {image &&<img src={image} alt="weatherimage" style={{width:"150px",height:"150px"}} />}
       </div>
       
        <div className="main-content">
          <h3>{deg}<sup>o</sup>C</h3>
          {city && <h3>{city}</h3>}
          {country && <h4>{country}</h4>}
        </div>

        <div className="detail">
          <div className="latitude">
            <h4>Latitude</h4>
           {latitude&& <h4>{latitude}</h4>}
          </div>
          <div className="Longitude">
            <h4>Longitude</h4>
            {longitude&&<h4>{longitude}</h4>}
          </div>
        </div>

        <div className="furtherdetail">
          <div className="box">
            <p>Humidity</p>
            {Humidity&&<h5>{Humidity}%</h5>}
          </div>
          <div className="box">
            <p>Wind Speed</p>
            {wind&&<h5>{wind} Km/h</h5>}
          </div>
        </div>
 }
       

        <div className="foot">
          Designed by  <strong>Santhoshkumar</strong>
        </div>
       </div>
    </>
  )
}

export default App
