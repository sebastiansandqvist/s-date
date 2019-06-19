const assert = require('assert');
const Benchmark = require('benchmark');
const formatDate = require('../');
const moment = require('moment');
const dateFns = require('date-fns');
const dayjs = require('dayjs');
const luxon = require('luxon');

const date = new Date();

const bench1 = () => {
  return formatDate('{Weekday} - {mm}/{dd}/{yyyy} {hh}:{Minutes}', date)
};

const bench2 = () => {
  return moment(date).format('dddd - MM/DD/YYYY hh:mm');
};

const bench3 = () => {
  return dateFns.format(date, 'dddd - MM/DD/YYYY hh:mm');
};

const bench4 = () => {
  return dayjs(date).format('dddd - MM/DD/YYYY hh:mm');
};

const bench5 = () => {
  return luxon.DateTime.fromJSDate(date).toFormat('cccc - MM/dd/yyyy hh:mm');
};

assert(bench1() === bench2());
assert(bench1() === bench3());
assert(bench1() === bench4());
assert(bench1() === bench5());

const suite = new Benchmark.Suite;

suite
  .add('s-date   ', bench1)
  .add('moment   ', bench2)
  .add('date-fns ', bench3)
  .add('dayjs    ', bench4)
  .add('luxon    ', bench5)
  .on('cycle', (e) => {
    console.log(String(e.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();
