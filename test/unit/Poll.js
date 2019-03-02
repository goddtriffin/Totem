const assert = require('assert');

const db_tool = require('../../tools/db');
let db;

const Poll = require('../../models/Poll');

describe('Poll', () => {
	describe('createPersonal', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it.skip('success', async () => {
			const result = await Poll.createPersonal(db);
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.createPersonal(null);
				assert.strictEqual(result.code, 500, result.data);
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

		it.skip('success', async () => {
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

		it.skip('success', async () => {
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

		it.skip('success', async () => {
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

		it.skip('success', async () => {
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

		it.skip('success', async () => {
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

		it.skip('success', async () => {
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
