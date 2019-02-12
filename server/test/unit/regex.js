const assert = require('assert');

const regex = require('../../../shared/regex');

describe('regex', () => {
	describe('email', () => {
		it('success', () => {
			assert(regex.validateEmail('griff170@purdue.edu'));
		});

		describe('syntax', () => {
			it('empty string', () => {
				assert(!regex.validateEmail(''));
			});

			it('no @', () => {
				assert(!regex.validateEmail('griff170purdue.edu'));
			});

			it('no local-part', () => {
				assert(!regex.validateEmail('@purdue.edu'));
			});
	
			it('no domain', () => {
				assert(!regex.validateEmail('griff170@'));
			});
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateEmail());
			});

			it('number', () => {
				assert(!regex.validateEmail(null));
			});

			it('undefined', () => {
				assert(!regex.validateEmail(undefined));
			});

			it('number', () => {
				assert(!regex.validateEmail(1));
			});

			it('array', () => {
				assert(!regex.validateEmail([]));
			});

			it('object', () => {
				assert(!regex.validateEmail({}));
			});
		});
	});

	describe('username', () => {
		it('success', () => {
			assert(regex.validateUsername('todd'));
		});

		it('too short', () => {
			assert(!regex.validateUsername('to'));
		});

		it('too long', () => {
			assert(!regex.validateUsername('toddtoddtoddtoddtoddt'));
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateUsername());
			});

			it('number', () => {
				assert(!regex.validateUsername(null));
			});

			it('undefined', () => {
				assert(!regex.validateUsername(undefined));
			});

			it('number', () => {
				assert(!regex.validateUsername(1));
			});

			it('array', () => {
				assert(!regex.validateUsername([]));
			});

			it('object', () => {
				assert(!regex.validateUsername({}));
			});
		});
	});
});
