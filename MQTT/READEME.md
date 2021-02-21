# MQNN
1. initialize_DB_Tables.py  
Execute this file to create “IoT.db” sqlite database file with Tables to store data.
2. mqtt_Listen_Sensor_Data.py 
Execute this file to receive MQTT Data transmitted by “mqtt_Publish_Dummy_Data.py” 
and save that into “IoT.db” file using “store_Sensor_Data_to_DB.py” file.
3. store_Sensor_Data_to_DB.py 
No need to execute this file. It will be invoked 
by “mqtt_Listen_Sensor_Data.py” to save the received MQTT data into “IoT.db” database.
