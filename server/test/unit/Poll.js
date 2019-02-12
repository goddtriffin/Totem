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
			assert.strictEqual(result.code, 200);
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
			assert.strictEqual(result.code, 200);
		});
    });
    
    describe('respondToChallengeRequest', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it.skip('success', async () => {
			const result = await Poll.respondToChallengeRequest(db);
			assert.strictEqual(result.code, 200);
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
			assert.strictEqual(result.code, 200);
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

		it.skip('success', async () => {
			const result = await Poll.search(db);
			assert.strictEqual(result.code, 200);
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
			assert.strictEqual(result.code, 200);
		});
	});
});
