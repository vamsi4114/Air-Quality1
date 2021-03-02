# MQNN saving subcribed data
1. mqtt_Listen_Sensor_Data.py 
Execute this file to receive MQTT Data transmitted by “mqtt_Publish_Dummy_Data.py” 
and save the data into the cloud server Firebase using the function in "store_Sebsir_Data_to_DB.py"

connect_mqtt(): used for connecting to the borker.

subscribe(client: mqtt_client):used for subscribing the data of PM sensors

sensor_Data_Handler(msg.payload): This function is saved in “mqtt_Listen_Sensor_Data.py” and it is used for saving data in to the Firebase.


2. store_Sensor_Data_to_DB.py 
No need to execute this file. It will be invoked 

It uses the module from Firebase to connect with the cloud server

(1) firebase.FirebaseApplication('https://ik1332-air-quality-default-rtdb.europe-west.firebasedatabase.app/')
This function is used to connect to the cloud server

(2) firebase.post(Topic, data)
This function is used to post data into specific topic of the database

The data fromat in out air quality project is Json format and is shown like this

air_quality_data = {'Sec': Sec, 'PM0_3': PM0_3, 'PM0_5': PM0_5, 'PM1': PM1, 'PM2_5': PM2_5
        , 'PM5': PM5, 'PM10': PM10}
        
Each episode this kind of data will be sent to broker and posted to the could server

