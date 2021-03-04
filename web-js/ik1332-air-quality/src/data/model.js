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

}

const modelInstance = new Model();
export default modelInstance;