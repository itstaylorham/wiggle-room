const fs = require('fs');
const ss = require('simple-statistics');

let rawdata = fs.readFileSync('/home/jeremy/Documents/AGT/sesh.json');
let sensorData = JSON.parse(rawdata);
let temperatureData = sensorData.map(obj => obj.Temperature[0]);
let moistureData = sensorData.map(obj => obj.Moisture[0]);
let lightData = sensorData.map(obj => obj.Light[0]);
let conductivityData = sensorData.map(obj => obj.Conductivity[0]);

async function detectTrend(data) {
  // First, we need to create an array of [index, value] pairs for our data
  let pairs = data.map((value, index) => [index, value]);

  // Now we calculate the linear regression
  let regression = ss.linearRegression(pairs);

  // The 'm' property of the regression result is the slope of the line.
  // If the slope is significantly different from zero, then we have a trend.
  if (Math.abs(regression.m) > 0.01) {  // Adjust the threshold as per your requirements
    // We have a trend. Let's generate an image and send it.
    console.log("Trend detected.");
    return true;
  } else {
    // No trend detected, return false.
    console.log("No new trends found.");
    return false;
  }
}

/*
function manipulateData() {
    let rawdata = fs.readFileSync('/home/jeremy/Documents/AGT/sesh.json');
    let sensorData = JSON.parse(rawdata);
  
    sensorData.forEach((obj, index) => {
      obj.Temperature[0] = index;  // Set temperature data to steadily increase
    });
    
  
    fs.writeFileSync('/home/jeremy/Documents/AGT/sesh.json', JSON.stringify(sensorData, null, 2));
  }
  */
  
  module.exports = {
    detectTrend
  //  ,manipulateData,
  };
  