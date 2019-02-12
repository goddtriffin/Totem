const assert = require('assert');

const db_tool = require('../../tools/db');
let db;

const Auth = require('../../models/Auth');
const User = require('../../models/User');

describe('Auth', () => {
	describe('validate', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success with user signup', async () => {
			const signup = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');

			const result = await Auth.validate(signup.data);
			assert.strictEqual(result.code, 200, result.data);
		});

		it('success with user login', async () => {
			const login = await User.login(db, 'todd', '12345678');

			const result = await Auth.validate(login.data);
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid token', async () => {
				const result = await Auth.validate(null);
				assert.strictEqual(result.code, 401, result.data);
			});
		});
    });
});

