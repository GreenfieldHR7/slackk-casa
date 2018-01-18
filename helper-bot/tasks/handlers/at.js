
const timeOutCalculator = (timeText) => {
	let timeInputs = timeText.split(' ');
	let currentTime = Date.getHours();

	// let validTimeTableInput = false;
	// let validNumberInput = false;
	// let timeOut = 1;

	timeInputs.forEach(input => {
		for (let key in timeTable) {
			if (input.indexOf(key) > -1) {
				timeOut *= timeTable[key];
				validTimeTableInput = true;
			}
		}

		if (parseInt(input)) {
			timeOut *= input;
			validNumberInput = true;
		}
	});

	return validTimeTableInput && validNumberInput  ? timeOut : undefined;
};

const timeTable = {
	second: 1,
	minute: 60,
	hour: 60 * 60,
	day: 60 * 60 * 24
};


module.exports = {timeOutCalculator};

//VALID INPUTS
//at 5pm
//at 2am
//at 5:00pm
//at 2:00am
//at 5
//at 2