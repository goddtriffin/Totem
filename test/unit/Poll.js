const assert = require('assert');

const db_tool = require('../../tools/db');
let db;

const Poll = require('../../models/Poll');
const User = require('../../models/User');

describe('Poll', () => {
	describe('createPersonal', () => {
		before(async () => {
            db = await db_tool.create(':memory:', true, false, true);
            
            const signup = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant', false);
            assert.strictEqual(signup.code, 200, signup.data);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.createPersonal(db, 'display_name', 'memes', 'todd', '1', 'public', 'image_1', 'image_2');
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.createPersonal(null);
				assert.strictEqual(result.code, 500, result.data);
            });
            
            it('invalid display_name', async () => {
				const result = await Poll.createPersonal(db, null);
				assert.strictEqual(result.code, 400, result.data);
            });
            
            it('invalid theme', async () => {
				const result = await Poll.createPersonal(db, 'display_name', null);
				assert.strictEqual(result.code, 400, result.data);
            });

            it('invalid creator', async () => {
				const result = await Poll.createPersonal(db, 'display_name', 'theme', null);
				assert.strictEqual(result.code, 400, result.data);
            });
            
            it('invalid duration', async () => {
				const result = await Poll.createPersonal(db, 'display_name', 'theme', 'creator', null);
				assert.strictEqual(result.code, 400, result.data);
            });
            
            it('invalid scope', async () => {
				const result = await Poll.createPersonal(db, 'display_name', 'theme', 'creator', 'duration', null);
				assert.strictEqual(result.code, 400, result.data);
            });
		});
    });
    
    describe('createChallenge', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.createChallenge(db);
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.createChallenge(null);
				assert.strictEqual(result.code, 500, result.data);
			});
		});
    });

    describe('getChallengeRequests', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.getChallengeRequests(db);
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.getChallengeRequests(null);
				assert.strictEqual(result.code, 500, result.data);
			});
		});
    });
    
    describe('acceptChallengeRequest', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.acceptChallengeRequest(db);
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.acceptChallengeRequest(null);
				assert.strictEqual(result.code, 500, result.data);
			});
		});
    });
    
    describe('searchPrivate', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.searchPrivate(db, 'memes');
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.searchPrivate(null);
				assert.strictEqual(result.code, 500, result.data);
            });
            
            it('invalid database', async () => {
				const result = await Poll.searchPrivate(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});
		});
    });

    describe('searchPrivate', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.searchPublic(db, 'memes');
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.searchPublic(null);
				assert.strictEqual(result.code, 500, result.data);
            });
            
            it('invalid database', async () => {
				const result = await Poll.searchPublic(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});
		});
    });
    
    describe('vote', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.vote(db);
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.vote(null);
				assert.strictEqual(result.code, 500, result.data);
			});
		});
	});
});
