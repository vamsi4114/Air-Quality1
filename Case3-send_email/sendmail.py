import yagmail
from firebase import firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import time

# db = firebase.FirebaseApplication('https://air-quality-9fe12-default-rtdb.firebaseio.com/')
QQ = 'cdlqumpnggfodjhe'
# ref = db.reference('/Air quality')
# data = db.get('/Air quality', None)
# data = ref.order_by_key().limit_to_last(2).get()
# data = list(data.values())

cred = credentials.Certificate('D:\PythonProject\Air Quality Web\ik1332-air-quality-firebase-adminsdk-41ejc'
                               '-a7a0186988.json')
yag = yagmail.SMTP(user='2627490866@qq.com', password=QQ, host='smtp.qq.com')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://ik1332-air-quality-default-rtdb.europe-west1.firebasedatabase.app/'
})
print("Successfully connect to the database")
# As an admin, the app has access to read and write all data, regradless of Security Rules
ref = db.reference('/Air quality')
Sent_flag = 1
while True:
    data = ref.order_by_key().limit_to_last(5).get()
    data = list(data.values())
    PM0_3 = []
    for item in data:
        PM0_3.append(item['PM0_3'])
    if min(PM0_3) > 1000 and Sent_flag:
        # Send e-mails
        yag.send(to=['2627490866@qq.com'], subject='Warn for Air Quality',
                 contents=['contents', 'The air quality is not very well right now. Please wear mask when you get out'])
        Sent_flag = 0
        print("Email sent")
    time.sleep(10)
