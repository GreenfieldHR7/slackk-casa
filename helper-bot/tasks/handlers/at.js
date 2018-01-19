
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
	
	let inputHourDifferenceToCurrent;
	let inputMinuteDifferenceToCurrent;
	let inputSecondDifferenceToCurrent;
	
	if (inputHour > currentHour) {
	  if (inputMinute > currentMinute) {
	    inputHourDifferenceToCurrent = inputHour - currentHour;
	    
	    if (currentSecond === 0) {
	      inputMinuteDifferenceToCurrent = inputMinute - currentMinute;
	      inputSecondDifferenceToCurrent = currentSecond;     
	    } else {
	      inputMinuteDifferenceToCurrent = inputMinute - currentMinute - 1;
	      inputSecondDifferenceToCurrent = 60 - currentSecond;
	    }
	  } else if (inputMinute === currentMinute) { 
	    inputHourDifferenceToCurrent = inputHour - currentHour;
	    inputMinuteDifferenceToCurrent = 0;
	    inputSecondDifferenceToCurrent = 0;
	  } else {
	    inputHourDifferenceToCurrent = inputHour - currentHour - 1;
	    
	    if (currentSecond === 0) {
	      inputMinuteDifferenceToCurrent = 60 - (currentMinute - inputMinute);
	      inputSecondDifferenceToCurrent = currentSecond;  
	    } else {
	      inputMinuteDifferenceToCurrent = 60 - (currentMinute - inputMinute) - 1;
	      inputSecondDifferenceToCurrent = 60 - currentSecond;
	    }
	  }
	} else if (inputHour === currentHour) {
	  if (inputMinute > currentMinute) {
	    inputHourDifferenceToCurrent = inputHour - currentHour;
	    
	    if (currentSecond === 0) {
	      inputMinuteDifferenceToCurrent = inputMinute - currentMinute;
	      inputSecondDifferenceToCurrent = currentSecond;     
	    } else {
	      inputMinuteDifferenceToCurrent = inputMinute - currentMinute - 1;
	      inputSecondDifferenceToCurrent = 60 - currentSecond;
	    }
	  } else if (inputMinute === currentMinute) { 
	  	inputHourDifferenceToCurrent = 0;
	  	inputMinuteDifferenceToCurrent = 0;
	  	inputSecondDifferenceToCurrent = 0;
	  } else {
	    inputHourDifferenceToCurrent = 23;
	    
	    if (currentSecond === 0) {
	      inputMinuteDifferenceToCurrent = 60 - (currentMinute - inputMinute);
	      inputSecondDifferenceToCurrent = currentSecond;  
	    } else {
	      inputMinuteDifferenceToCurrent = 60 - (currentMinute - inputMinute) - 1;
	      inputSecondDifferenceToCurrent = 60 - currentSecond;
	    }
	  }
	} else if (inputHour < currentHour) {
	  if (inputMinute > currentMinute) {
	    inputHourDifferenceToCurrent = 24 - (currentHour - inputHour);
	    
	    if (currentSecond === 0) {
	      inputMinuteDifferenceToCurrent = inputMinute - currentMinute;
	      inputSecondDifferenceToCurrent = currentSecond;     
	    } else {
	      inputMinuteDifferenceToCurrent = inputMinute - currentMinute - 1;
	      inputSecondDifferenceToCurrent = 60 - currentSecond;
	    }
	  } else if (inputMinute === currentMinute) {
	  	inputHourDifferenceToCurrent = 24 - (currentHour - inputHour);
	  	inputMinuteDifferenceToCurrent = 0;
	  	inputSecondDifferenceToCurrent = 0;
	  } else {
	    inputHourDifferenceToCurrent = 24 - (currentHour - inputHour) - 1;
	    
	    if (currentSecond === 0) {
	      inputMinuteDifferenceToCurrent = 60 - (currentMinute - inputMinute);
	      inputSecondDifferenceToCurrent = currentSecond;
	    } else {
	      inputMinuteDifferenceToCurrent = 60 - (currentMinute - inputMinute) - 1;
	      inputSecondDifferenceToCurrent = 60 - currentSecond;
	    }
	  }
	}
	
	let validInputHour = inputHour <= 24;
	let validInputMinute = inputHour <= 59;

	let timeOut = inputHourDifferenceToCurrent * 3600 + inputMinuteDifferenceToCurrent * 60 + inputSecondDifferenceToCurrent;

	return (validInputHour && validInputMinute) ? timeOut : undefined;
};


module.exports = {timeOutCalculator};
