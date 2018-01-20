
const timeOutCalculator = (timeText) => {
	let timeInputs = timeText.split(' ');
	let validDayInput = false;
	let currentDay = new Date().getDay();
	let dayCount;

	timeInputs.forEach(input => {
		for (let day in weekTable) {
			let inputLowerCase = input.toLowerCase();

			if (inputLowerCase.indexOf(day) > -1) {
				if (currentDay < weekTable[day]) {
				  dayCount = weekTable[day] - currentDay;
				  validDayInput = true;
				} else if (currentDay > weekTable[day]) {
				  dayCount = 7 - currentDay + weekTable[day];
				  validDayInput = true;
				}
			}
		}
	});

	let timeOut = dayCount * 86400; //number of seconds in day
	return validDayInput ? timeOut : undefined;
};

const weekTable = {
	sun: 0,
	mon: 1,
	tue: 2,
	wed: 3,
	thu: 4,
	fri: 5,
	sat: 6
};


module.exports = {timeOutCalculator};