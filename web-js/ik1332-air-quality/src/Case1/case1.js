import React, { Component } from "react";
import modelInstance from "../data/model";
import { Chart, Line } from "react-chartjs-2";
import "./case1.css";

Chart.defaults.global.legend.display = false;

function GraphData(props) {
	console.log(props.labels);
	console.log(props.data);
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
				<h3>PM<sub>{props.type}</sub> : {props.currentVal}</h3>
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
	  let data = modelInstance.getEntryValue("PM0_3");
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
		let labels = modelInstance.getEntryValue("Sec");
		let currentValues = modelInstance.getLatestEntry();
		let currentWeather = null;
		switch (this.state.status){
			case "LOADING":
				response = <p>loading</p>;
				break;
			case "LOADED":
				console.log(modelInstance.getLatestEntry());
				response =
				<div>
					<div className="graphData">
						<GraphData labels={labels} type={2.5} currentVal={currentValues.PM2_5} data={modelInstance.getEntryValue("PM2_5")}/>
						<GraphData labels={labels} type={10} currentVal={currentValues.PM10} data={modelInstance.getEntryValue("PM10")}/>
					</div>
					<div className="graphData">
						<GraphData labels={labels} type={0.3} currentVal={currentValues.PM0_3} data={modelInstance.getEntryValue("PM0_3")}/>
						<GraphData labels={labels} type={0.5} currentVal={currentValues.PM0_5} data={modelInstance.getEntryValue("PM0_5")}/>
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
				<h3>Air Quality</h3>
				<p>An air quality index (AQI) is used by government agencies to communicate to the public how polluted the air currently is
				or how polluted it is forecast to become. Public health risks increase as the AQI rises.</p>
				{response}

				<h3>Weather forcast</h3>

			</div>
		);
	}
}
export default Case1;
