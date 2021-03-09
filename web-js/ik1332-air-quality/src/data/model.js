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
	getEntryValue(pType){
		let data = [];
		this.allEntries
			.on("value", snapshot => {
				snapshot.forEach(snap => {
					data.push(snap.val()[pType]);
				});
			});

		return data;

	}
	getWeatherDataForCity(city){
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

}

const modelInstance = new Model();
export default modelInstance;