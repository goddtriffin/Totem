const assert = require('assert');

const db_tool = require('../../tools/db');
let db;

const User = require('../../models/User');
const Friend = require('../../models/Friend');

describe('Friend', () => {
	describe('add', () => {
		before(async () => {
            db = await db_tool.create(':memory:', true, false, true);

            await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
            await User.signup(db, 'kplakyda@purdue.edu', 'kelp', 'keelpay', '87654321', 'eyes');
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Friend.add(db, 'todd', 'kelp');
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Friend.add(null);
				assert.strictEqual(result.code, 500, result.data);
			});

			it('invalid username_1', async () => {
				const result = await Friend.add(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});

			it('invalid username_2', async () => {
				const result = await Friend.add(db, 'null', null);
				assert.strictEqual(result.code, 400, result.data);
            });
		});
    });

    describe('requests', () => {
		before(async () => {
            db = await db_tool.create(':memory:', true, false, true);
            
            await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
            await User.signup(db, 'kplakyda@purdue.edu', 'kelp', 'keelpay', '87654321', 'eyes');
            await User.signup(db, 'one@one.one', 'one', 'one_1', '12345678', 'one');
            await User.signup(db, 'two@two.two', 'two', 'two_2', '87654321', 'two');

            await Friend.add(db, 'todd', 'kelp');
            await Friend.add(db, 'todd', 'one');
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success with zero friend requests', async () => {
            const result = await Friend.requests(db, 'two');

            assert.strictEqual(result.code, 200, result.data);
            assert.strictEqual(result.data.sent.length + result.data.received.length, 0, result.data);
        });
        
        it('success with one friend request', async () => {
            const result = await Friend.requests(db, 'kelp');

            assert.strictEqual(result.code, 200, result.data);
            assert.strictEqual(result.data.sent.length + result.data.received.length, 1, result.data);
        });
        
        it('success with two friend requests', async () => {
            const result = await Friend.requests(db, 'todd');

            assert.strictEqual(result.code, 200, result.data);
            assert.strictEqual(result.data.sent.length + result.data.received.length, 2, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Friend.requests(null);
				assert.strictEqual(result.code, 500, result.data);
            });
            
            it('invalid username', async () => {
				const result = await Friend.requests(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});
		});
    });

    describe('accept', () => {
		before(async () => {
            db = await db_tool.create(':memory:', true, false, true);
            
            await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
            await User.signup(db, 'kplakyda@purdue.edu', 'kelp', 'keelpay', '87654321', 'eyes');

            await Friend.add(db, 'todd', 'kelp');
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Friend.accept(db, 'todd', 'kelp');
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Friend.accept(null);
				assert.strictEqual(result.code, 500, result.data);
			});

			it('invalid username_1', async () => {
				const result = await Friend.accept(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});

			it('invalid username_2', async () => {
				const result = await Friend.accept(db, 'null', null);
				assert.strictEqual(result.code, 400, result.data);
            });
		});
    });
    
    describe('get', () => {
		before(async () => {
            db = await db_tool.create(':memory:', true, false, true);
            
            await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
            await User.signup(db, 'kplakyda@purdue.edu', 'kelp', 'keelpay', '87654321', 'eyes');
            await User.signup(db, 'one@one.one', 'one', 'one_1', '12345678', 'one');
            await User.signup(db, 'two@two.two', 'two', 'two_2', '87654321', 'two');

            await Friend.add(db, 'todd', 'kelp');
            await Friend.add(db, 'todd', 'one');

            await Friend.accept(db, 'kelp', 'todd');
            await Friend.accept(db, 'one', 'todd');
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success with zero friends', async () => {
            const result = await Friend.get(db, 'two');
            
            assert.strictEqual(result.code, 200, result.data);
            assert.strictEqual(result.data.length, 0, result.data);
        });
        
        it('success with one friend', async () => {
            const result = await Friend.get(db, 'kelp');
            
            assert.strictEqual(result.code, 200, result.data);
            assert.strictEqual(result.data.length, 1, result.data);
        });
        
        it('success with two friends', async () => {
            const result = await Friend.get(db, 'todd');
            
            assert.strictEqual(result.code, 200, result.data);
            assert.strictEqual(result.data.length, 2, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Friend.get(null);
				assert.strictEqual(result.code, 500, result.data);
            });
            
            it('invalid username', async () => {
				const result = await Friend.get(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});
		});
    });

    describe('remove', () => {
		before(async () => {
            db = await db_tool.create(':memory:', true, false, true);

            await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant');
            await User.signup(db, 'kplakyda@purdue.edu', 'kelp', 'keelpay', '87654321', 'eyes');
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
            await Friend.add(db, 'todd', 'kelp');

			const result = await Friend.remove(db, 'todd', 'kelp');
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Friend.remove(null);
				assert.strictEqual(result.code, 500, result.data);
			});

			it('invalid username_1', async () => {
				const result = await Friend.remove(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});

			it('invalid username_2', async () => {
				const result = await Friend.remove(db, 'null', null);
				assert.strictEqual(result.code, 400, result.data);
            });
		});
    });
});
