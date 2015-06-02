// ----- dependencies
// ---------------------------------------
// require('blanket')({
//     pattern: function (filename) {
//         return !/node_modules/.test(filename);
//     }
// });

var expect = require('chai').expect;
var date = require('../index.js');

const testDate = new Date(1994, 10, 7, 6, 25, 4);
const testDate2 = new Date(2001, 0, 1, 1, 60, 30);
const testDate3 = new Date(2013, 11, 02, 12); // noon
const testDate4 = new Date(2050, 10, 22, 0); // midnight
const testDate5 = new Date(2050, 10, 22, 24); // is actually the 23rd
const testDate6 = new Date(2050, 10, 22, 16); // pm time
const testDate7 = new Date(2001, 0, 1, 1, 1, 60); // 60 seconds

// ----- tests
// ---------------------------------------
describe('date', function() {

	describe('formatting', function() {

		describe('years', function() {

			it('should return a 4 digit year for {yyyy}', function() {
				expect(date('{yyyy}', testDate)).to.equal('1994');
				expect(date('{yyyy}', testDate2)).to.equal('2001');
			});

			it('should return a 2 digit year for {yy}', function() {
				expect(date('{yy}', testDate)).to.equal('94');
				expect(date('{yy}', testDate2)).to.equal('01');
			});

		});

		describe('months', function() {

			it('should return a 1+ digit month for {m}', function() {
				expect(date('{m}', testDate)).to.equal('11');
				expect(date('{m}', testDate2)).to.equal('1');
			});

			it('should return a 2 digit month for {mm}', function() {
				expect(date('{mm}', testDate)).to.equal('11');
				expect(date('{mm}', testDate2)).to.equal('01');
			});

			it('should return a month name for {Month}', function() {
				expect(date('{Month}', testDate)).to.equal('November');
				expect(date('{Month}', testDate2)).to.equal('January');
			});

			it('should return a 3-letter month name for {Mo}', function() {
				expect(date('{Mo}', testDate)).to.equal('Nov');
				expect(date('{Mo}', testDate2)).to.equal('Jan');
			});

		});

		describe('days', function() {

			it('should return a 1+ digit day for {d}', function() {
				expect(date('{d}', testDate)).to.equal('7');
				expect(date('{d}', testDate2)).to.equal('1');
				expect(date('{d}', testDate3)).to.equal('2');
				expect(date('{d}', testDate4)).to.equal('22');
			});

			it('should return a 2 digit day for {d}', function() {
				expect(date('{dd}', testDate)).to.equal('07');
				expect(date('{dd}', testDate2)).to.equal('01');
				expect(date('{dd}', testDate3)).to.equal('02');
			});

			it('should return a day with suffix {D}', function() {
				expect(date('{ds}', testDate)).to.equal('7th');
				expect(date('{ds}', testDate2)).to.equal('1st');
				expect(date('{ds}', testDate3)).to.equal('2nd');
				expect(date('{ds}', testDate4)).to.equal('22nd');
				expect(date('{ds}', testDate5)).to.equal('23rd');
			});

			it('should return a day name for {Weekday}', function() {
				expect(date('{Weekday}', testDate)).to.equal('Tuesday');
				expect(date('{Weekday}', testDate3)).to.equal('Tuesday');
			});

			it('should return a short day name for {Day}', function() {
				expect(date('{Day}', testDate)).to.equal('Tue');
				expect(date('{Day}', testDate3)).to.equal('Tue');
			});

			it('should return the shortest day name for {Dy}', function() {
				expect(date('{Dy}', testDate)).to.equal('Tu');
				expect(date('{Dy}', testDate3)).to.equal('Tu');
			});

			it('should return the 1-char day name for {D}', function() {
				expect(date('{D}', testDate)).to.equal('T');
				expect(date('{D}', testDate3)).to.equal('T');
				expect(date('{D}', testDate5)).to.equal('T');
			});

		});

		describe('hours', function() {

			it('should return 2 digit 12-hour for {hh}', function() {
				expect(date('{hh}', testDate)).to.equal('06');
				expect(date('{hh}', testDate3)).to.equal('12');
				expect(date('{hh}', testDate4)).to.equal('12');
				expect(date('{hh}', testDate5)).to.equal('12');
				expect(date('{hh}', testDate6)).to.equal('04');

			});

			it('should return 1+ digit 12-hour for {h}', function() {
				expect(date('{h}', testDate)).to.equal('6');
				expect(date('{h}', testDate3)).to.equal('12');
				expect(date('{h}', testDate4)).to.equal('12');
				expect(date('{h}', testDate5)).to.equal('12');
				expect(date('{h}', testDate6)).to.equal('4');
			})
			
			it('should return 2 digit 24-hour for {hh24}', function() {
				expect(date('{hh24}', testDate)).to.equal('06');
				expect(date('{hh24}', testDate3)).to.equal('12');
				expect(date('{hh24}', testDate4)).to.equal('00');
				expect(date('{hh24}', testDate5)).to.equal('00'); // 24 hrs == 0 hours next day
				expect(date('{hh24}', testDate6)).to.equal('16');
			});

			it('should return 1+ digit 24-hour for {h24}', function() {
				expect(date('{h24}', testDate)).to.equal('6');
				expect(date('{h24}', testDate3)).to.equal('12');
				expect(date('{h24}', testDate4)).to.equal('0');
				expect(date('{h24}', testDate5)).to.equal('0');
				expect(date('{h24}', testDate6)).to.equal('16');
			});

			it('should return am/pm for {ampm}', function() {
				expect(date('{ampm}', testDate)).to.equal('am');
				expect(date('{ampm}', testDate3)).to.equal('pm');
				expect(date('{ampm}', testDate4)).to.equal('am');
				expect(date('{ampm}', testDate5)).to.equal('am');
				expect(date('{ampm}', testDate6)).to.equal('pm');
			});

			it('should return AM/PM for {AMPM}', function() {
				expect(date('{AMPM}', testDate)).to.equal('AM');
				expect(date('{AMPM}', testDate3)).to.equal('PM');
				expect(date('{AMPM}', testDate4)).to.equal('AM');
				expect(date('{AMPM}', testDate5)).to.equal('AM');
				expect(date('{AMPM}', testDate6)).to.equal('PM');
			});

		});

		describe('minutes', function() {

			it('should return 2-digit minutes', function() {
				expect(date('{Minutes}', testDate)).to.equal('25');
				expect(date('{Minutes}', testDate2)).to.equal('00'); // 60 minutes
				expect(date('{Minutes}', testDate3)).to.equal('00');
				expect(date('{Minutes}', testDate4)).to.equal('00');
				expect(date('{Minutes}', testDate5)).to.equal('00');
				expect(date('{Minutes}', testDate6)).to.equal('00');
			});

		});

		describe('seconds', function() {

			it('should return 2-digit seconds', function() {
				expect(date('{Seconds}', testDate)).to.equal('04');
				expect(date('{Seconds}', testDate2)).to.equal('30');
				expect(date('{Seconds}', testDate7)).to.equal('00');
			});

		});

		describe('multi-format', function() {

			it('should format correctly', function() {

				var seb = date('{Month} {ds}, {yyyy}, a {Weekday}, at {h}:{Minutes}{ampm}', testDate)
				expect(seb).to.equal('November 7th, 1994, a Tuesday, at 6:25am')

				var dante = date('{mm}/{dd}/{yy}', testDate2)
				expect(dante).to.equal('01/01/01');

				var ruby = date('{Weekday} the {ds}, {yyyy}', testDate3)
				expect(ruby).to.equal('Tuesday the 2nd, 2013')

			});

		});

	});

	it('should use right now when no Date provided', function() {
		
		var today = new Date();
		var year = date('{yyyy}');
		var actualYear = today.getFullYear().toString();
		var month = date('{m}');
		var actualMonth = (today.getMonth() + 1).toString();
		var day = date('{d}');
		var actualDay = today.getDate().toString();

		expect(year).to.equal(actualYear);
		expect(month).to.equal(actualMonth);
		expect(day).to.equal(actualDay);

	});

});