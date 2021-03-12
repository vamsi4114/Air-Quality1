import React, { Component } from "react";
import modelInstance from "../data/model";
import { Chart, Line } from "react-chartjs-2";
import "./case1.css";
import Forecast from "./Forecast";

Chart.defaults.global.legend.display = false;

function GraphData(props) {
	let labels = ["1","2","3","4","5","6","7","8","9","10","11","12"];
	let resp = modelInstance.checkCAQI(props.type, props.currentVal);
	let chartData = {
	  labels: labels,
	  datasets: [
	    {
	      data: props.data,
	      borderColor: "rgba(75,192,192,1)"
	    }
	  ]
	};
	let chartOpt = {
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: "PM" + props.type + " ug/m3"
				}
			}],
			xAxes: [{
				scaleLabel: {
					display: true,
					labelString: "over time"
				}
			}]
		}
	}

	return  <div className="graph">
				<h3>PM<sub>{props.type}</sub> : <b className="pmCurrentVal" style={{backgroundColor: resp.color}}>   {props.currentVal}   </b></h3>
				<p>Current levels are {resp.risk}</p>
				<Line data={chartData} options={chartOpt}/>
			</div>;
}
class Case1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
		status: "LOADING",
		entries: null,
		dataPM25: null,
		dataPM10: null
    }
  }
  componentDidMount(){
	  modelInstance.addObserver(this);
	  let dataPM25 = modelInstance.getLatestValues(12, "PM2_5");
	  let dataPM10 = modelInstance.getLatestValues(12, "PM10");
	  modelInstance.getAllEntries()
	  	.then((response) => {
			this.setState({
				status: "LOADED",
				entries: response,
				dataPM25: dataPM25,
				dataPM10: dataPM10
			});
		})
		.catch(() => {
			this.setState({
				status: "ERROR"
			});
		});
	}
	componentWillUnmount(){
		modelInstance.removeObserver(this);
	}
	/*
    update(model, changeDetails) {
		if (changeDetails.type === "new-val") {
			if(changeDetails.value !== this.state.currentVal){

				this.setState({
					status: "UPDATED",
					currentVal: changeDetails.value
				});
			}
		}
    }
    */
	render() {
		let response = null;
		let currentValues = modelInstance.getLatestEntry();
		switch (this.state.status){
			case "LOADING":
				response = <p>loading</p>;
				break;
			case "LOADED":
				response =
				<div>
					<div className="graphData">
						<GraphData type={2.5} currentVal={currentValues.PM2_5} data={this.state.dataPM25}/>
						<GraphData type={10} currentVal={currentValues.PM10} data={this.state.dataPM10}/>
					</div>
				</div>;

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
				<h1>Outdoor activity planner</h1>
				<Forecast/>
				<div>
					<h3>Air Quality</h3>
					<p>Following are measurments of the concentration of PM<sub>2.5</sub> and PM<sub>10</sub> in &#181;g/m<sup>3</sup> over time, with color coding based on the Common Air Quality Index (CAQI)</p>
					{response}
				</div>
			</div>
		);
	}
}
export default Case1;
