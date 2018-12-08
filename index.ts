// years
const yyyy = (date: Date) => date.getFullYear().toString(); // {yyyy}
const yy = (date: Date) => date.getFullYear().toString().slice(-2); // {yy}

// months
const m = (date: Date) => (date.getMonth() + 1).toString(); // {m}

const mm = (date: Date) => {
  const monthInt = date.getMonth() + 1;
  return monthInt < 10 ? '0' + monthInt : monthInt.toString(); // {mm}
}

const month = (date: Date) => {
  const months = [
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

const mo = (date: Date) => month(date).substr(0, 3);

// days
const day = (date: Date) => date.getDate().toString();

const dd = (date: Date) => {
  const d = date.getDate();
  return d < 10 ? '0' + d : d.toString(); // {dd}
}

const dayWithSuffix = (date: Date) => {
  const d = date.getDate();
  const daySuffixes = Object.create(null);
  daySuffixes.st = [1, 21, 31];
  daySuffixes.nd = [2, 22];
  daySuffixes.rd = [3, 23];

  // loop through 'st', 'nd', and 'rd' (suffixes like '1st', '2nd', etc)
  // if suffix is not found, it is 'th' (most numbers)
  let suffixNotFound = true;
  let suffix = '';
  for (suffix in daySuffixes) {
    if (daySuffixes[suffix].indexOf(d) > -1) {
      suffixNotFound = false;
      break;
    }
  }

  if (suffixNotFound) suffix = 'th';
  return d + suffix;
}

const weekday = (date: Date) => {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  return weekdays[date.getDay()];
}

const weekday3 = (date: Date) => weekday(date).substr(0, 3);
const weekday2 = (date: Date) => weekday(date).substr(0, 2);
const weekday1 = (date: Date) => weekday(date)[0];

// hours
const hours24 = (date: Date) => date.getHours().toString();

const hh24 = (date: Date) => {
  const h = date.getHours();
  return h < 10 ? '0' + h : h.toString();
}

const hours = (date: Date) => {
  const h = date.getHours();
  return h % 12 === 0 ? '12' : (h % 12).toString(); // {h}
}

// relies on `hours` function
const hh = (date: Date) => {
  const h = date.getHours();
  const n = h % 12 === 0 ? 12 : h % 12;
  return n < 10 ? '0' + n : n.toString();
}

const ampm = (date: Date) => date.getHours() < 12 ? 'am' : 'pm'; // {ampm}
const AMPM = (date: Date) => date.getHours() < 12 ? 'AM' : 'PM'; // {ampm}

// minutes, seconds
const minutes = (date: Date) => {
  const min = date.getMinutes();
  return min < 10 ? '0' + min : min.toString();
}

const seconds = (date: Date) => {
  const sec = date.getSeconds();
  return sec < 10 ? '0' + sec : sec.toString();
}

interface DateMap {
  [key: string]: (date: Date) => string;
}

const map: DateMap = {
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

const regex = /\{yyyy\}|\{yy\}|\{m\}|\{mm\}|\{Month\}|\{Mo\}|\{d\}|\{dd\}|\{ds\}|\{Weekday\}|\{Day\}|\{Dy\}|\{D\}|\{h24\}|\{hh24\}|\{h\}|\{hh\}|\{ampm\}|\{AMPM\}|\{Minutes\}|\{Seconds\}/g;

/*
  formatDate('{mm}/{dd}/{yyyy}', new Date(2001, 0, 1)) => '01/01/2001'
 */
export = function formatDate(format: string, date: Date = new Date()): string {
  return format.replace(regex, (match) => map[match](date));
}
