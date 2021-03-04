import ObservableModel from "./ObservableModel";
import firebase from "firebase";
import firebaseConfig from "./apiConfig";

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
	getDataPair(pType){
		let data = [];
		//let i = 0;
		modelInstance.getAllEntries()
			.then(response => {
				console.log(response.pType +"/n");
				//data = data + [{response.pType, response.Sec}];
			});
		return data;

	}

}

const modelInstance = new Model();
export default modelInstance;