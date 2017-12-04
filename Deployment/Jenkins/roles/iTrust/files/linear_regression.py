#!/usr/bin/python
import numpy as np
from sklearn import linear_model
import pycurl
from StringIO import StringIO

up_threshold = 1000
down_threshold = 200
x_axis = np.arange(0, 60).reshape(-1, 1)
y_axis = np.loadtxt('/src/www/traffic_history').reshape(-1, 1)
y_axis = y_axis[-60:-1]

x_axis_test = np.arange(61, 120).reshape(-1, 1)

# Create linear regression object
regr = linear_model.LinearRegression()

# Train the model using the training sets
regr.fit(x_axis, y_axis)

# Make predictions using the testing set
pred = regr.predict(x_axis_test)

down = False
up = False
for i in range(len(pred)):
    if pred[i][0] > up_threshold:
        up = True
    if pred[i][0] < down_threshold:
        down = True

if up:
    trigger('iTrust-Scale-Up')
elif down:
    trigger('iTrust-Scale-Down')


def trigger(name):
    buffer = StringIO()
    c = pycurl.Curl()
    c.setopt(c.URL, 'http://127.0.0.1:8080/job/' + name + '/build')
    c.setopt(c.WRITEDATA, buffer)
    c.perform()
    c.close()
