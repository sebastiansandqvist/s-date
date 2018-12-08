"use strict";
// years
var yyyy = function (date) { return date.getFullYear().toString(); }; // {yyyy}
var yy = function (date) { return date.getFullYear().toString().slice(-2); }; // {yy}
// months
var m = function (date) { return (date.getMonth() + 1).toString(); }; // {m}
var mm = function (date) {
    var monthInt = date.getMonth() + 1;
    return monthInt < 10 ? '0' + monthInt : monthInt.toString(); // {mm}
};
var month = function (date) {
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
};
var mo = function (date) { return month(date).substr(0, 3); };
// days
var day = function (date) { return date.getDate().toString(); };
var dd = function (date) {
    var d = date.getDate();
    return d < 10 ? '0' + d : d.toString(); // {dd}
};
var dayWithSuffix = function (date) {
    var d = date.getDate();
    var daySuffixes = Object.create(null);
    daySuffixes.st = [1, 21, 31];
    daySuffixes.nd = [2, 22];
    daySuffixes.rd = [3, 23];
    // loop through 'st', 'nd', and 'rd' (suffixes like '1st', '2nd', etc)
    // if suffix is not found, it is 'th' (most numbers)
    var suffixNotFound = true;
    var suffix = '';
    for (suffix in daySuffixes) {
        if (daySuffixes[suffix].indexOf(d) > -1) {
            suffixNotFound = false;
            break;
        }
    }
    if (suffixNotFound)
        suffix = 'th';
    return d + suffix;
};
var weekday = function (date) {
    var weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    return weekdays[date.getDay()];
};
var weekday3 = function (date) { return weekday(date).substr(0, 3); };
var weekday2 = function (date) { return weekday(date).substr(0, 2); };
var weekday1 = function (date) { return weekday(date)[0]; };
// hours
var hours24 = function (date) { return date.getHours().toString(); };
var hh24 = function (date) {
    var h = date.getHours();
    return h < 10 ? '0' + h : h.toString();
};
var hours = function (date) {
    var h = date.getHours();
    return h % 12 === 0 ? '12' : (h % 12).toString(); // {h}
};
// relies on `hours` function
var hh = function (date) {
    var h = date.getHours();
    var n = h % 12 === 0 ? 12 : h % 12;
    return n < 10 ? '0' + n : n.toString();
};
var ampm = function (date) { return date.getHours() < 12 ? 'am' : 'pm'; }; // {ampm}
var AMPM = function (date) { return date.getHours() < 12 ? 'AM' : 'PM'; }; // {ampm}
// minutes, seconds
var minutes = function (date) {
    var min = date.getMinutes();
    return min < 10 ? '0' + min : min.toString();
};
var seconds = function (date) {
    var sec = date.getSeconds();
    return sec < 10 ? '0' + sec : sec.toString();
};
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
module.exports = function formatDate(format, date) {
    if (date === void 0) { date = new Date(); }
    return format.replace(regex, function (match) { return map[match](date); });
};
