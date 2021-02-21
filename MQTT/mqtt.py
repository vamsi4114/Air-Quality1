import random
import sqlite3
from paho.mqtt import client as mqtt_client
from store_Sensor_Data_to_DB import sensor_Data_Handler

broker = 'broker.ssvl.kth.se'
port = 1883
topic = "KTH/avr-rss2/fcc23d0000017f97/sensors"
# generate client ID with pub prefix randomly
client_id = ''


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print("MQTT Data Received...")
        print("MQTT Topic: " + msg.topic)
        print("Data: " + str(msg.payload))
        sensor_Data_Handler(msg.topic, msg.payload)

    client.subscribe(topic)
    client.on_message = on_message


def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    run()
