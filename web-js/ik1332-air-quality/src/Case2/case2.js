import React, { Component } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import "./case2.css";
import modelInstance from "../data/model";

function SmokeAlarm(props){

}
class Case2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
		status: "LOADING",
		currentVal: null
    }
  }
  componentDidMount(){
	  modelInstance.addObserver(this);
	  modelInstance.getUpdatesFor("PM0_3");
  }
  componentWillUnmount() {
  modelInstance.removeObserver(this);
  }
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

	render() {
		let response = null;
		let greenBtn = <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Green_Light_Icon.svg/1200px-Green_Light_Icon.svg.png" width="100px" height="100px" />;
		let redBtn = <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Red_Light_Icon.svg/1024px-Red_Light_Icon.svg.png" width="100px" height="100px" />
		let lightBtn = null;
		switch (this.state.status){
			case("LOADING"):
				response = <p>waiting for data</p>;
				break;

			case("UPDATED"):
				response = <p>The current level of PM<sub>0.3</sub> is {this.state.currentVal}</p>;
				if(this.state.currentVal<1000){
					lightBtn = greenBtn;
				}
				else{
					lightBtn = redBtn;
				}
				break;

			default :
				break;
		}

		return(
			<div className="Case2">
				<h3>Indoor Air Quality Detection For Smoke Alarm System</h3>
				 <Accordion allowMultipleExpanded allowZeroExpanded>
					<AccordionItem>
						<AccordionItemHeading>
							<AccordionItemButton className="accordionBtn">
								About
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel className="accordionPanel">
							<p>
							   <b>Welcome to air quality group!</b>
							   <br/>
							   This is case2 : Indoor air quality detection for smoke alarm system.
							   <br/>
							   Following is our contributors: <br/>
							   Vangara Vamsi Krishna: vkva@kth.se <br/>
							   Muzi Cheng: muzi@kth.se <br/>
							   Saga Harnesk: sagah@kth.se <br/>
			   				   Fengyuan Zhou: fzhou@kth.se
			   				</p>
						</AccordionItemPanel>
            		</AccordionItem>
					<AccordionItem>
						<AccordionItemHeading>
							<AccordionItemButton className="accordionBtn">
								Instruction
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel className="accordionPanel">
							    <p>
									<ul>
										<li>Use sensor nodes for smoke alarm</li>
										<li>Sensor nodes publish the particle level using MQTT-SN to a gateway broker</li>
										<li>Used in public places  like cybercafe and restaurants </li>
										<li>Set threshold for PM2.5 or other particle level</li>
										<li>Operators of those public places get the data from our web page</li>
									</ul>
    							</p>
						</AccordionItemPanel>
            		</AccordionItem>
					<AccordionItem>
						<AccordionItemHeading>
							<AccordionItemButton className="accordionBtn">
								Particle Concentration
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel className="accordionPanel">
							    <p>This is the particle level in your restaurant!</p>
							    {response}
							    {lightBtn}
						</AccordionItemPanel>
            		</AccordionItem>
            	</Accordion>
			</div>
		);
	}
}
export default Case2;
