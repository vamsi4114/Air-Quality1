import ObservableModel from "./ObservableModel";
import firebase from "firebase";
import {firebaseConfig, WEATHER_API_KEY} from "./apiConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Model extends ObservableModel{
	constructor() {
		super();
		this.db = firebaseApp.database();
		//this.db = firebase.database();
		this.allEntries = this.db.ref("Air quality");
	}
	secToHours(sec){
		return sec/60;
	}
	getAllEntries(){
		console.log("get all entries");
		return this.allEntries
			.get()
			.then(response => { return response.toJSON() })
			.catch(e => console.log(e));

	}
	getLatestEntry(){
		let entry = null;
		this.allEntries
			.on("value", snapshot => {
				snapshot.forEach(snap => {
					if(entry == null){
						entry = snap.val();
					}
					else{
						if(entry.Sec < snap.val().Sec){
							entry = snap.val();
						}
						else{}
					}
				});
			});

		return entry;
	}
	getUpdatesFor(pType){
		let entry = null;
		this.allEntries
			.on("value", snapshot => {
				snapshot.forEach(snap => {
					entry = snap.val();
					this.notifyObservers({ type: "new-val", value: entry[pType], ptype: pType });
				});
			});
	}
	getLatestValues(numOfVal, pType){
		let data = [];
		this.allEntries
			.orderByKey()
			.limitToLast(numOfVal)
			.on("value", snapshot => {
				snapshot.forEach(snap => {
					data.push(snap.val()[pType]);
				});
			});
		console.log(data);
		return data;

	}
	checkCAQI(pType, pVal){
		let resp = null;
		if((pType === 2.5 && pVal <= 15) || (pType === 10 && pVal <= 25)){
			resp = ({risk: "very low", color: "#79bc6a"});
		}
		else if((pType === 2.5 && (15 < pVal) && (pVal <= 30)) || (pType === 10 && (25 < pVal) && (pVal <= 50))){
			resp = ({risk: "low", color: "#bbcf4c"});
		}
		else if((pType === 2.5 && (30 < pVal) && (pVal <= 55)) || (pType === 10 && (50 < pVal) && (pVal <= 90))){
			resp = ({risk: "medium", color: "#eec20b"});
		}
		else if(pType === 2.5 && (55 < pVal) && (pVal <= 110) || pType === 10 && (90 < pVal) && (pVal <= 180)){
			resp = ({risk: "high", color: "#f29305"});
		}
		else if(pType === 2.5 && (110 < pVal) || pType === 10 && (180 < pVal)){
			resp = ({risk: "very high", color: "#e8416f"});
		}
		else{
			console.log(pType, pVal);
			resp = "error";
		}
		return resp;


	}
/*	getWeatherDataForCity(city){
		fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html", {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": WEATHER_API_KEY,
				"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
			}
		})
		.then(response => {
			console.log(response.json);
		})
		.catch(err => {
			console.error(err);
		});
	}
*/
}

const modelInstance = new Model();
export default modelInstance;