#!/usr/bin/python
import numpy as np
from sklearn import linear_model

x_axis = np.arange(0, 60).reshape(-1, 1)
y_axis = np.loadtxt('/src/www/traffic_history').reshape(-1, 1)

# print(x_axis)
# print(y_axis)

x_axis_test = np.arange(61, 120).reshape(-1, 1)

# Create linear regression object
regr = linear_model.LinearRegression()

# Train the model using the training sets
regr.fit(x_axis, y_axis)

# Make predictions using the testing set
pred = regr.predict(x_axis_test)
print(pred)

# The coefficients
print('Coefficients: \n', regr.coef_)
