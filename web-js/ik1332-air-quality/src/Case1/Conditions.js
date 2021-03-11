import React from 'react';

const conditions = (props) => {
	return (
		<div>
			{props.responseObj.cod === 200 ?
				<div>
					<h3>Weather</h3>
                   <p>In {props.responseObj.name} it is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</p>
               </div>
           : null
           }
       </div>
   )
}

export default conditions;