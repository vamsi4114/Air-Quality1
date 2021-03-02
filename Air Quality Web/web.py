from flask import Flask, redirect, url_for, request, render_template
import sqlite3 as sql
from firebase import firebase
app = Flask(__name__, template_folder=r"D:\PythonProject\Air Quality Web\template")


@app.route('/')
def testweb():
    return render_template('airquality.html')


@app.route('/case1.html')
def case1():
    db = firebase.FirebaseApplication('https://ik1332-air-quality-default-rtdb.europe-west1'
                                            '.firebasedatabase.app/')
    data = db.get('/Air quality', None)
    data = data.values()
    return render_template('case1.html', rows=data)


@app.route('/case2.html')
def case2():
    db = firebase.FirebaseApplication('https://ik1332-air-quality-default-rtdb.europe-west1'
                                      '.firebasedatabase.app/')
    data = db.get('/Air quality', None)
    data = list(data.values())
    return render_template('case2.html', rows=data)

@app.route('/case3.html')
def case3():
    return render_template('case3.html')

if __name__ == '__main__':
    app.run(debug=True)
