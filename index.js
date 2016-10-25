'use strict';

// ----- Date formatter
//		-- @param format {String}
//		-- @param date {Date} optional date context
//		-- @return {String}
// ---------------------------------------
module.exports = function formatDate(format, date) {

	// default to today
	if (!date) {
		date = new Date();
	}

	// ----- years
	// ---------------------------------------
	var yyyy = date.getFullYear().toString(); // {yyyy}
	var yy = yyyy.slice(-2); // {yy}
	
	// ----- months
	// ---------------------------------------
	var monthInt = date.getMonth() + 1;
	var m = monthInt.toString(); // {m}
	var mm = monthInt < 10 ? '0' + m : m; // {mm}
	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var month = months[date.getMonth()]; // {Month} & {Mo}


	// ----- days
	// ---------------------------------------
	var day = date.getDate();
	var dd = day < 10 ? '0' + day : day; // {dd}


	// ----------------- suffixes -----------------
	var daySuffixes = Object.create(null); // so for in loop works
	daySuffixes.st = [1, 21, 31];
	daySuffixes.nd = [2, 22];
	daySuffixes.rd = [3, 23];

	// loop through 'st', 'nd', and 'rd' (suffixes like '1st', '2nd', etc)
	// if suffix is not found, it is 'th' (most numbers)
	var suffixNotFound;
	var suffix;

	for (suffix in daySuffixes) {
		if (daySuffixes[suffix].indexOf(day) > -1) {
			suffixNotFound = false;
			break;
		}
		suffixNotFound = true;
	}

	if (suffixNotFound) {
		suffix = 'th';
	}

	var dayWithSuffix = day + suffix; // {D}
	// ----------------- end suffixes -----------------

	var weekdays = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
	];

	var weekday = weekdays[date.getDay()];


	// ----- hours
	// ---------------------------------------
	var hours24 = date.getHours();
	var hh24 = hours24 < 10 ? '0' + hours24 : hours24;
	var hours = hours24 % 12 === 0 ? 12 : hours24 % 12; // {h}
	var hh = hours < 10 ? '0' + hours : hours;
	var ampm = hours24 < 12 ? 'am' : 'pm'; // {ampm}

	// ----- minutes, seconds
	// ---------------------------------------
	var min = date.getMinutes();
	var minutes = min < 10 ? '0' + min : min;
	
	var sec = date.getSeconds();
	var seconds = sec < 10 ? '0' + sec : sec;

	return format
		.replace(/\{yyyy\}/g, yyyy)
		.replace(/\{yy\}/g, yy)
		.replace(/\{m\}/g, m)
		.replace(/\{mm\}/g, mm)
		.replace(/\{Month\}/g, month)
		.replace(/\{Mo\}/g, month.substr(0, 3))
		.replace(/\{d\}/g, day)
		.replace(/\{dd\}/g, dd)
		.replace(/\{ds\}/g, dayWithSuffix)
		.replace(/\{Weekday\}/g, weekday)
		.replace(/\{Day\}/g, weekday.substr(0, 3))
		.replace(/\{Dy\}/g, weekday.substr(0, 2))
		.replace(/\{D\}/g, weekday[0])
		.replace(/\{h24\}/g, hours24)
		.replace(/\{hh24\}/g, hh24)
		.replace(/\{h\}/g, hours)
		.replace(/\{hh\}/g, hh)
		.replace(/\{ampm\}/g, ampm)
		.replace(/\{AMPM\}/g, ampm.toUpperCase())
		.replace(/\{Minutes\}/g, minutes)
		.replace(/\{Seconds\}/g, seconds);

};