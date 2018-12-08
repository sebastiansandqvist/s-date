import test from 'ava';
import date from '../';

test('date formatting', (t) => {
  const date1 = new Date(1994, 10, 7, 6, 25, 4);
  const date2 = new Date(2001, 0, 1, 1, 60, 30);
  const date3 = new Date(2013, 11, 2, 12); // noon
  const date4 = new Date(2050, 10, 22, 0); // midnight
  const date5 = new Date(2050, 10, 22, 16); // pm time

  const format = '{yyyy} {yy} / {mm} {m} {Month} {Mo} - {d} {ds} {dd} -- {Weekday} -- {Day} {Dy} {D} {h24} {hh24} {hh} {h} {ampm} {AMPM} {Minutes} {Seconds}';
  const out1 = '1994 94 / 11 11 November Nov - 7 7th 07 -- Monday -- Mon Mo M 6 06 06 6 am AM 25 04';
  const out2 = '2001 01 / 01 1 January Jan - 1 1st 01 -- Monday -- Mon Mo M 2 02 02 2 am AM 00 30';
  const out3 = '2013 13 / 12 12 December Dec - 2 2nd 02 -- Monday -- Mon Mo M 12 12 12 12 pm PM 00 00';
  const out4 = '2050 50 / 11 11 November Nov - 22 22nd 22 -- Tuesday -- Tue Tu T 0 00 12 12 am AM 00 00';
  const out5 = '2050 50 / 11 11 November Nov - 22 22nd 22 -- Tuesday -- Tue Tu T 16 16 04 4 pm PM 00 00';

  t.is(date(format, date1), out1);
  t.is(date(format, date2), out2);
  t.is(date(format, date3), out3);
  t.is(date(format, date4), out4);
  t.is(date(format, date5), out5);
});

test('repeats', (t) => {
  const date1 = new Date(1994, 10, 7, 6, 25, 4);
  t.is(date('{d}{d}{d}', date1), '777');
  t.is(date('{d} {Seconds} {d}', date1), '7 04 7');
});

test('default date = now', (t) => {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const day = today.getDate().toString();
  t.is(date('{yyyy}'), year);
  t.is(date('{m}'), month);
  t.is(date('{d}'), day);
});
