import React, {useState} from 'react';
import Conditions from './Conditions';

const Forecast = () => {
	let [responseObj, setResponseObj] = useState({});
	function getForecast() {
		fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=seattle", {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "bad6f0dea6msha5efcb9cc29bc04p11f93cjsn6ae369bb6467",
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
           <h3>Find Current Weather Conditions</h3>

           <button onClick={getForecast}>Get Forecast</button>
           <Conditions
		                  responseObj={responseObj}
               />
       </div>
	)
}
export default Forecast;