import React, { Component } from "react";
import modelInstance from "../data/model";
import { Chart, Line } from "react-chartjs-2";
import "./case1.css";

Chart.defaults.global.legend.display = false;

function GraphData(props) {
	//console.log(props.labels);
	//console.log(props.data);
	let resp = modelInstance.checkCAQI(props.type, props.currentVal);
	let chartData = {
	  labels: props.labels,
	  datasets: [
	    {
	      data: props.data,
	      borderColor: "rgba(75,192,192,1)"
	    }
	  ]
	};
	return  <div className="graph">
				<h3>PM<sub>{props.type}</sub> : <b className="pmCurrentVal" style={{backgroundColor: resp.color}}>   {props.currentVal}   </b></h3>
				<p>Current levels are {resp.risk}</p>
				<Line data={chartData}/>
			</div>;
}
class Case1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
		status: "LOADING",
		entries: null,
		data: null,
		weather: null
    }
  }
  componentDidMount(){
	  modelInstance.addObserver(this);
	  let data = modelInstance.getLatestValues(12, "PM0_3");
	  modelInstance.getAllEntries()
	  	.then((response) => {
			this.setState({
				status: "LOADED",
				entries: response,
				data: data
			});
		})
		.catch(() => {
			this.setState({
				status: "ERROR"
			});
		});
		//modelInstance.getWeatherDataForCity("Stockholm");
	}
	componentWillUnmount(){
		modelInstance.removeObserver(this);
	}
	render() {
		let response = null;
		let labels = ["1","2","3","4","5","6","7","8","9","10","11","12"];
		let currentValues = modelInstance.getLatestEntry();
		let currentWeather = null;
		switch (this.state.status){
			case "LOADING":
				response = <p>loading</p>;
				break;
			case "LOADED":
				console.log(this.state.data);
				response =
				<div>
					<div className="graphData">
						<GraphData labels={labels} type={2.5} currentVal={currentValues.PM2_5} data={modelInstance.getLatestValues(12, "PM2_5")}/>
						<GraphData labels={labels} type={10} currentVal={currentValues.PM10} data={modelInstance.getLatestValues(12, "PM10")}/>
					</div>
				</div>;
				currentWeather = this.state.weather;

			 	break;
			 case "ERROR":
			 	response = <p>error</p>;
			 	break;
			 default:
			 	response = <p>loading</p>;
				break;
		 }

		return (
			<div id="Case1">
				<h3>Outdoor activity planner</h3>
				<p>An air quality index (AQI) is used to communicate how polluted the air currently is
				or how polluted it is forecast to become. Public health risks increase as the AQI rises.
				The lower the particle concentration the safer it is, medium concentration might be hazardous to sensitiv groups and high concentrations
				may cause significant harm to a person's health</p>
				<p>Following are measurments of PM<sub>2.5</sub> and PM<sub>10</sub> with color coding based on the Common Air Quality Index (CAQI)</p>
				{response}


			</div>
		);
	}
}
export default Case1;
