import React, { Component } from "react";
import modelInstance from "../data/model";
import { Line } from "react-chartjs-2";

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
	  let data = modelInstance.getDataPair("PM0_3");
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
		switch (this.state.status){
			case "LOADING":
				response = <p>loading</p>;
				break;
			case "LOADED":
			 	response = <Line data={this.state.data}/>;
			 	console.log(this.state.entries);
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
				<h1>Use case 1 test</h1>
				{response}
			</div>
		);
	}
}
export default Case1;
