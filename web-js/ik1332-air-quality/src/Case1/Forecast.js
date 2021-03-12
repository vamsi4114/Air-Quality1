import React, {useState} from 'react';
import Conditions from './Conditions';
import ObservableModel from "../data/ObservableModel";
import modelInstance from "../data/model";
import {WEATHER_API_KEY} from "../data/apiConfig";

const Forecast = () => {
	let [responseObj, setResponseObj] = useState({});
	let [city, setCity] = useState('');
	let [unit, setUnit] = useState('metric');

	function getForecast(e) {
		e.preventDefault();
		console.log("get forecast");
		//modelInstance.notifyObservers({ type: "get-forecast" });
		let url = "https://community-open-weather-map.p.rapidapi.com/weather?units=metric&q=" + city;
		fetch(url, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": WEATHER_API_KEY,
				"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
			}
		})
		.then(response => response.json())
		.then(response => {
			setResponseObj(response)
		})
	}
	return (
       <div>
				<form onSubmit={getForecast}>
					<label>Where are you going? </label>
					<input type="text" placeholder="City" required onChange={(e) => setCity(e.target.value)}/>
					<button className="btn" type="submit">Search</button>
				</form>

           <Conditions
		                  responseObj={responseObj}
               />
       </div>
	)
}
export default Forecast;