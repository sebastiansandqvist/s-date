// years
function yyyy(date) {
  return date.getFullYear().toString(); // {yyyy}
}

function yy(date) {
  return date.getFullYear().toString().slice(-2); // {yy}
}

// months
function m(date) {
  var monthInt = date.getMonth() + 1;
  return monthInt.toString(); // {m}
}

function mm(date) {
  var monthInt = date.getMonth() + 1;
  var mth = monthInt.toString();
  return monthInt < 10 ? '0' + mth : mth; // {mm}
}

function month(date) {
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
  return months[date.getMonth()]; // {Month}
}

function mo(date) {
  return month(date).substr(0, 3);
}

// days
function day(date) {
  return date.getDate();
}

function dd(date) {
  var d = date.getDate();
  return d < 10 ? '0' + d : d; // {dd}
}

function dayWithSuffix(date) {
  var d = date.getDate();
  var daySuffixes = Object.create(null);
  daySuffixes.st = [1, 21, 31];
  daySuffixes.nd = [2, 22];
  daySuffixes.rd = [3, 23];

  // loop through 'st', 'nd', and 'rd' (suffixes like '1st', '2nd', etc)
  // if suffix is not found, it is 'th' (most numbers)
  var suffixNotFound = true;
  var suffix;
  for (suffix in daySuffixes) {
    if (daySuffixes[suffix].indexOf(d) > -1) {
      suffixNotFound = false;
      break;
    }
  }

  if (suffixNotFound) suffix = 'th';
  return d + suffix;
}

function weekday(date) {
  var weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  return weekdays[date.getDay()];
}

function weekday3(date) {
  return weekday(date).substr(0, 3);
}

function weekday2(date) {
  return weekday(date).substr(0, 2);
}

function weekday1(date) {
  return weekday(date)[0];
}

// hours
function hours24(date) {
  return date.getHours();
}

function hh24(date) {
  var h = date.getHours();
  return h < 10 ? '0' + h : h;
}

function hours(date) {
  var h = date.getHours();
  return h % 12 === 0 ? 12 : h % 12; // {h}
}

// relies on `hours` function
function hh(date) {
  var h = hours(date);
  return h < 10 ? '0' + h : h;
}

function ampm(date) {
  return date.getHours() < 12 ? 'am' : 'pm'; // {ampm}
}

function AMPM(date) {
  return date.getHours() < 12 ? 'AM' : 'PM'; // {ampm}
}

// minutes, seconds
function minutes(date) {
  var min = date.getMinutes();
  return min < 10 ? '0' + min : min;
}

function seconds(date) {
  var sec = date.getSeconds();
  return sec < 10 ? '0' + sec : sec;
}

/**
 * foo vbar
 * @param  {String}
 * @param  {Date?}
 * @return {String}
 */
module.exports = function formatDate(format, date) {

  // default to today
  if (!date) date = new Date();

  var map = {
    '{yyyy}': yyyy,
    '{yy}': yy,
    '{m}': m,
    '{mm}': mm,
    '{Month}': month,
    '{Mo}': mo,
    '{d}': day,
    '{dd}': dd,
    '{ds}': dayWithSuffix,
    '{Weekday}': weekday,
    '{Day}': weekday3,
    '{Dy}': weekday2,
    '{D}': weekday1,
    '{h24}': hours24,
    '{hh24}': hh24,
    '{h}': hours,
    '{hh}': hh,
    '{ampm}': ampm,
    '{AMPM}': AMPM,
    '{Minutes}': minutes,
    '{Seconds}': seconds
  };

  var regex = /\{yyyy\}|\{yy\}|\{m\}|\{mm\}|\{Month\}|\{Mo\}|\{d\}|\{dd\}|\{ds\}|\{Weekday\}|\{Day\}|\{Dy\}|\{D\}|\{h24\}|\{hh24\}|\{h\}|\{hh\}|\{ampm\}|\{AMPM\}|\{Minutes\}|\{Seconds\}/g;

  return format.replace(regex, function(match) {
    return map[match](date);
  });
};
