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
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '123', 'eggplant', 0, 0, 0, 0);
			assert.equal(result.code, 200);
		});

		it('username already exists', async () => {
			await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '123', 'eggplant', 0, 0, 0, 0);
			const result = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '123', 'eggplant', 0, 0, 0, 0);
			assert.equal(result.code, 409);
		});
	});

	describe('login', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
			await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '123', 'eggplant', 0, 0, 0, 0);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await User.login(db, 'todd', '123');
			assert.equal(result.code, 200);
		});

		it('no account found with username', async () => {
			const result = await User.login(db, 'nonexistent', '123');
			assert.equal(result.code, 400);
		});

		it('wrong password', async () => {
			const result = await User.login(db, 'todd', '1234');
			assert.equal(result.code, 401);
		});
	});

	describe('getByUsername', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
			await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '123', 'eggplant', 0, 0, 0, 0);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await User.getByUsername(db, 'todd');
			assert.equal(result.code, 200);
		});

		it('no account found with username', async () => {
			const result = await User.getByUsername(db, 'nonexistent');
			assert.equal(result.code, 400);
		});
	});

	describe('search', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await User.search(db, 'anything');
			assert.equal(result.code, 200);
		});
	});

	describe('all', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await User.all(db);
			assert.equal(result.code, 200);
		});
	});
});
