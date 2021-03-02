import json
import sqlite3
from firebase import firebase


# ===============================================================
# Database Manager Class

class DatabaseManager():
    def __init__(self):
        self.firebase = firebase.FirebaseApplication('https://ik1332-air-quality-default-rtdb.europe-west1'
                                                     '.firebasedatabase.app/')

    def add_update_db_record(self, data):
        self.firebase.post('Air quality', data)
        return


# ===============================================================
# Functions to push Sensor Data into Database

# Function to save Temperature to DB Table
def Air_Quality_Data_Handler(jsonData):
    # Parse Data
    json_Dict = json.loads(jsonData)
    Sec = json_Dict[0]['Sec']
    PM0_3 = json_Dict[0]['DB0_3']
    PM0_5 = json_Dict[0]['DB0_5']
    PM1 = json_Dict[0]['DB1']
    PM2_5 = json_Dict[0]['DB2_5']
    PM5 = json_Dict[0]['DB5']
    PM10 = json_Dict[0]['DB10']

    air_quality_data = {'Sec': Sec, 'PM0_3': PM0_3, 'PM0_5': PM0_5, 'PM1': PM1, 'PM2_5': PM2_5
        , 'PM5': PM5, 'PM10': PM10}
    # Push into DB Table
    dbObj = DatabaseManager()
    dbObj.add_update_db_record(air_quality_data)
    print("Inserted Temperature Data into Database.")
    print("")


# ===============================================================
# Master Function to Select DB Funtion based on MQTT Topic

def sensor_Data_Handler(jsonData):
    Air_Quality_Data_Handler(jsonData)
