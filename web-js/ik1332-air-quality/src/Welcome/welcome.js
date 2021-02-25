
import React, { Component } from "react";
import "./welcome.css";

class Welcome extends Component{
	render() {
		return (
			<div>
				<h1>Welcome to air quality group!</h1>
				<h3>Three potential use cases</h3>
				<div id="UseCases">
					<div className="UseCase">
						<p>Case 1 : Outdoor air quality detection for travelers</p>
						<ul>
							<li>Connect air quality data to travel planners so that they can see if they should take a different route for their outdoor activities</li>
							<li>Connect with open API to get the weather report together with air quality</li>
							<li>Travelers get the data from our web page</li>
						</ul>
					</div>
					<div className="UseCase">
						<p>Case 2 : Indoor air quality detection for smoke alarm system</p>
						<ul>
							<li>Use sensor nodes for smoke alarm</li>
							<li>Sensor nodes publish the particle level using MQTT-SN to a gateway broker</li>
							<li>Used in public places  like cybercafe and restaurants </li>
							<li>Set threshold for PM2.5 or other particle level</li>
							<li>Operators of those public places get the data from our web page</li>
						</ul>
					</div>
					<div className="UseCase">
						<p>Case 3 : Outdoor Air Quality - living nearby the industrial areas</p>
						<ul>
							<li>Sensors are set up in the place nearby industrial areas</li>
							<li>The software uses the sensor data to identify the quality</li>
							<li>Sensor publishes the information using MQTT SN to the gateway/broker</li>
							<li>A server subscribes to the events and processes these data</li>
							<li>(Client) operators can view the data through a web UI so that measurable effects can be taken into consideration</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Welcome;