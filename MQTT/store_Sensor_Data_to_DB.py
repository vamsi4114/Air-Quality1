import json
import sqlite3

# SQLite DB Name
DB_Name = "IoT.db"


# ===============================================================
# Database Manager Class

class DatabaseManager():
    def __init__(self):
        self.conn = sqlite3.connect(DB_Name)
        self.conn.execute('pragma foreign_keys = on')
        self.conn.commit()
        self.cur = self.conn.cursor()

    def add_del_update_db_record(self, sql_query, args=()):
        self.cur.execute(sql_query, args)
        self.conn.commit()
        return

    def __del__(self):
        self.cur.close()
        self.conn.close()


# ===============================================================
# Functions to push Sensor Data into Database

# Function to save Temperature to DB Table
def Air_Quality_Data_Handler(jsonData):
    # Parse Data
    json_Dict = json.loads(jsonData)
    Data_and_Time = json_Dict[0]['bn']
    air = json_Dict[0]['bu']

    # Push into DB Table
    dbObj = DatabaseManager()
    dbObj.add_del_update_db_record(
        "insert into Air_Quality_Data(Date_n_Time, air) values (?,?)",
        [Data_and_Time, air])
    del dbObj
    print("Inserted Temperature Data into Database.")
    print("")




# ===============================================================
# Master Function to Select DB Funtion based on MQTT Topic

def sensor_Data_Handler(Topic, jsonData):
    Air_Quality_Data_Handler(jsonData)

