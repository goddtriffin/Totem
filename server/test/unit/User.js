const assert = require('assert');

const db_tool = require('../../tools/db');
let db;

const User = require('../../models/User');

describe('User', () => {
	describe('signup', () => {
		beforeEach(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		afterEach(async () => {
			await db.destroy()
		});

		it('successful signup', async () => {
			const result = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '123', 'eggplant', 0, 0, 0, 0);
			assert.equal(result.code, 200);
		});

		it('username already exists in users table', async () => {
			await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '123', 'eggplant', 0, 0, 0, 0);
			const result = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '123', 'eggplant', 0, 0, 0, 0);
			assert.equal(result.code, 409);
		});
	});
});
