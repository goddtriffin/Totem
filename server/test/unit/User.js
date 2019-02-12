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
			const result = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
			assert.strictEqual(result.code, 200, result.data);
		});

		it('username already exists', async () => {
			await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
			const result = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
			assert.strictEqual(result.code, 409, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await User.signup(null, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
				assert.strictEqual(result.code, 500, result.data);
			});

			it('invalid email', async () => {
				const result = await User.signup(db, null, 'todd', 'goddtriffin', '12345678', 'eggplant');
				assert.strictEqual(result.code, 400, result.data);
			});

			it('invalid username', async () => {
				const result = await User.signup(db, 'griff170@purdue.edu', null, 'goddtriffin', '12345678', 'eggplant');
				assert.strictEqual(result.code, 400, result.data);
			});

			it('invalid display_name', async () => {
				const result = await User.signup(db, 'griff170@purdue.edu', 'todd', null, '12345678', 'eggplant');
				assert.strictEqual(result.code, 400, result.data);
			});

			it('invalid password', async () => {
				const result = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', null, 'eggplant');
				assert.strictEqual(result.code, 400, result.data);
			});

			it('invalid emoji', async () => {
				const result = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', null);
				assert.strictEqual(result.code, 400, result.data);
			});
		});
	});

	describe('login', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
			await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await User.login(db, 'todd', '12345678');
			assert.strictEqual(result.code, 200, result.data);
		});

		it('no account found with username', async () => {
			const result = await User.login(db, 'nonexistent', '12345678');
			assert.strictEqual(result.code, 400, result.data);
		});

		it('wrong password', async () => {
			const result = await User.login(db, 'todd', '123456789');
			assert.strictEqual(result.code, 401, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await User.login(null, 'todd', '12345678');
				assert.strictEqual(result.code, 500, result.data);
			});

			it('invalid username', async () => {
				const result = await User.login(db, null, '12345678');
				assert.strictEqual(result.code, 400, result.data);
			});

			it('invalid password', async () => {
				const result = await User.login(db, 'todd', null);
				assert.strictEqual(result.code, 400, result.data);
			});
		});
	});

	describe('getByUsername', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
			await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await User.getByUsername(db, 'todd');
			assert.strictEqual(result.code, 200, result.data);
		});

		it('no account found with username', async () => {
			const result = await User.getByUsername(db, 'nonexistent');
			assert.strictEqual(result.code, 400, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await User.getByUsername(null, 'todd');
				assert.strictEqual(result.code, 500, result.data);
			});

			it('invalid username', async () => {
				const result = await User.getByUsername(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});
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

		it('success with zero results', async () => {
			const result = await User.search(db, 'zero');
			assert.strictEqual(result.code, 200, result.data);
			assert.strictEqual(result.data.length, 0, result.data);
		});

		it('success with one result', async () => {
			await User.signup(db, 'one@one.one', 'one', 'number-one', '11111111', 'eggplant');

			const result = await User.search(db, 'o');
			assert.strictEqual(result.code, 200, result.data);
			assert.strictEqual(result.data.length, 1, result.data);
		});

		it('success with multiple results', async () => {
			await User.signup(db, 'two@two.two', 'two', 'number-two', '22222222', 'eggplant');

			const result = await User.search(db, 'o');
			assert.strictEqual(result.code, 200, result.data);
			assert.strictEqual(result.data.length, 2, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await User.search(null, 'anything');
				assert.strictEqual(result.code, 500, result.data);
			});

			it('invalid username_query', async () => {
				const result = await User.search(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});
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
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await User.all(null);
				assert.strictEqual(result.code, 500, result.data);
			});
		});
	});

	describe('update', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
			await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '123', 'eggplant');
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success with 1 column', async () => {
			const result = await User.update(db, 'todd', 'toddgriffin');
			assert.strictEqual(result.code, 200, result.data);
		});

		it('success with 2 columns', async () => {
			const result = await User.update(db, 'todd', null, '123456789', 'a');
			assert.strictEqual(result.code, 200, result.data);
		});

		it('success with 3 columns', async () => {
			const result = await User.update(db, 'todd', 'goddtriffin', '12345678', 'eggplant');
			assert.strictEqual(result.code, 200, result.data);
		});

		it('must pick at least one column to update', async () => {
			const result = await User.update(db, 'todd');
			assert.strictEqual(result.code, 400, result.data);
		});
	});

	describe('history', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it.skip('success', async () => {
			const result = await User.history(db);
			assert.strictEqual(result.code, 200, result.data);
		});
	});
});
