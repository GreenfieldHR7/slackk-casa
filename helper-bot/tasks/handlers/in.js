
//only handles numbers (1,2,3...) not one, two, three
const timeOutCalculator = (timeText) => {
	let timeInputs = timeText.split(' ');
	let validTimeTableInput = false;
	let validNumberInput = false;
	let timeOut = 1;

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
	sec: 1,
	min: 60,
	hour: 60 * 60,
	day: 60 * 60 * 24
};


module.exports = {timeOutCalculator};