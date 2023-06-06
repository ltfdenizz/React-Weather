import "./App.css";
import Wheather from "./wheatherresult";
import Weather from "./wheatherresult";
import { useState } from "react";

function App() {
  const APP_KEY = "306c8214656b4c809b4113340230306";
  let cityİnput = "";
  const [wheatherdata, setwheatherdata] = useState([]);
  function citytext() {
    document.querySelector("input").addEventListener("input", (e) => {
      e.preventDefault();
      cityİnput = e.target.value;
      console.log(cityİnput);
    });
  }
  async function getdata(value) {
    if (value === "") return;
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=3&aqi=no&alerts=no`
    );
    const result = await data.json();
    setwheatherdata(result.forecast.forecastday);
    console.log(result.forecast.forecastday);
  }

  return (
    <div>
      <div className="search">
        <input type="text" placeholder="Search a city..." onChange={citytext} />
        <button onClick={() => getdata(cityİnput)}>Search</button>
      </div>
      {wheatherdata.map((item) => (
        <Wheather
          key={item.key}
          date={item.date}
          mintemp={item.day.mintemp_c}
          maxtemp={item.day.maxtemp_c}
          condition={item.day.condition.text}
          icon={item.day.condition.icon}
        />
      ))}
    </div>
  );
}

export default App;
