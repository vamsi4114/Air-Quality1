import React, { Component } from "react";
import modelInstance from "../data/model";
import { Line } from "react-chartjs-2";
/*
const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: this.state.data,
      //fill: true,
      //backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    }
  ]
};
*/
class Case1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
		status: "LOADING",
		entries: null,
		data: null
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
	}
	componentWillUnmount(){
		modelInstance.removeObserver(this);
	}
	render() {
		let response = null;
		let chartData = null;
		switch (this.state.status){
			case "LOADING":
				response = <p>loading</p>;
				break;
			case "LOADED":
				chartData = {
			labels: modelInstance.getEntryValue("Sec"),
  		 	datasets: [
			{
			  label: "PM0_3",
			  data: this.state.data,
			  borderColor: "rgba(255,0,255,1)"
			},
			{
			  label: "PM0_5",
			  data: modelInstance.getEntryValue("PM0_5"),
			  borderColor: "rgba(75,192,192,1)"
			}
		  ]
	  };
			 	response =
			 		<div>

			 			<Line data={chartData}/>
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
			<div>
				<h1>Use case 1</h1>
				{response}

			</div>
		);
	}
}
export default Case1;
