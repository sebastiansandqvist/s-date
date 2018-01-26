# s-date
[![NPM version](https://img.shields.io/npm/v/s-date.svg)](https://www.npmjs.com/package/s-date) ![Dependencies](https://img.shields.io/david/sebastiansandqvist/s-date.svg) [![build status](http://img.shields.io/travis/sebastiansandqvist/s-date.svg)](https://travis-ci.org/sebastiansandqvist/s-date) [![NPM license](https://img.shields.io/npm/l/s-date.svg)](https://www.npmjs.com/package/s-date)

Same general purpose as moment.js, but in ~1kb minified.

This CommonJS module exports a single function that takes two parameters. The first is a format string, the second is an optional `Date`. If the date is omitted, it defaults to `new Date();`.

## Usage
```javascript
var date = require('s-date');

var myBirthday = new Date(1994, 10, 7);
date('{mm}/{dd}/{yyyy}', myBirthday); // '11/07/1994'
```

## Formatting options

Example: For January 2, 2053 4:30pm + 45 seconds

| String template | Output example | Meaning             |
| --------------- | -------------- | ------------------- |
| `{yyyy}`        | 2053           | 4-digit year        |
| `{yy}`          | 53             | 2-digit year        |
| `{mm}`          | 01             | 2-digit month       |
| `{m}`           | 1              | unpadded month      |
| `{Month}`       | January        | month name          |
| `{Mo}`          | Jan            | month shortname     |
| `{d}`           | 2              | date                |
| `{ds}`          | 2nd            | date + suffix       |
| `{dd}`          | 02             | 2-digit date        |
| `{Weekday}`     | Thursday       | day of the week     |
| `{Day}`         | Thu            | day shortname       |
| `{Dy}`          | Th             | day shortername     |
| `{D}`           | T              | 1-char day name     |
| `{h24}`         | 16             | unpadded hours (24) |
| `{hh24}`        | 16             | hours (24)          |
| `{hh}`          | 04             | hours (12)          |
| `{h}`           | 4              | unpadded hours (12) |
| `{ampm}`        | pm             | am/pm               |
| `{AMPM}`        | PM             | AM/PM               |
| `{Minutes}`     | 30             | Minutes (padded)    |
| `{Seconds}`     | 45             | Seconds (padded)    |


**To output the example above...**
```javascript
// Date(year, month-1, date, hours, minutes, seconds)
var someDay = new Date(2053, 0, 2, 4, 30, 45);
date('{Month} {d}, {yyyy} {h}:{Minutes}{ampm} + {Seconds} seconds', someDay);
```
