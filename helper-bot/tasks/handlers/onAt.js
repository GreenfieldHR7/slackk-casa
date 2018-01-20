const on_Handler = require('./on.js');
const at_Handler = require('./at.js');


const timeOutCalculator = (timeText) => {
  let currentTime = Date().toString().split(' ')[4];
	let currentTimeSegmented = currentTime.split(':');

	let inputTime = timeText.split(' ').slice(timeText.split(' ').length - 1)[0];
	let inputTimeHasMinutes = inputTime.indexOf(':') > -1;
	let inputMeridiem = inputTime.slice(inputTime.length - 2);
	
	let inputHour = 0;
	let inputMinute = 0;
	let inputSecond = 0;
	
	let currentHour = parseFloat(currentTimeSegmented[0]);
	let currentMinute = parseFloat(currentTimeSegmented[1]);
	let currentSecond = parseFloat(currentTimeSegmented[2]);
	
	if (inputTimeHasMinutes) {
	  if (inputMeridiem === 'pm' || inputMeridiem === 'am') {
	    inputHour = inputTime.split(':')[0];
	    inputMinute = parseFloat(inputTime.split(':')[1].slice(0,2));
	  } else {
	    inputHour = inputTime.split(':')[0];
	    inputMinute = parseFloat(inputTime.split(':')[1]);
	  }
	} else {
	  if (inputMeridiem === 'pm' || inputMeridiem === 'am') {
	    inputHour = inputTime.slice(0, inputTime.length - 2);
	  } else {
	    inputHour = inputTime;
	  }
	}
	
	if (inputMeridiem === 'pm') {
	  inputHour = parseFloat(inputHour) + 12;
	} else {
	  inputHour = parseFloat(inputHour);
	}

	let daysAway = on_Handler.timeOutCalculator(timeText) / 86400; //number of seconds in one day
	let timeOut = 0;

	if (daysAway > 1) {
		timeOut = (daysAway - 1) * 86400;
	}

	if (inputHour > currentHour) {
		timeOut += at_Handler.timeOutCalculator(timeText) + 86400; 
	} else if (inputHour === currentHour) {
		if (inputMinute > currentMinute) {
			timeOut += at_Handler.timeOutCalculator(timeText) + 86400;
		} else if (inputMinute === currentMinute) {
			timeOut += 86400;
		} else if (inputMinute < currentMinute) {
			timeOut += at_Handler.timeOutCalculator(timeText);
		}
	} else if (inputHour < currentHour) {
		timeOut += at_Handler.timeOutCalculator(timeText);
	}

  let validInputHour = inputHour <= 24;
	let validInputMinute = inputHour <= 59;

	return (validInputHour && validInputMinute) ? timeOut : undefined;
}


module.exports = {timeOutCalculator};
