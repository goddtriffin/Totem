const assert = require('assert');

const db_tool = require('../../tools/db');
let db;

const Friend = require('../../models/Friend');

describe('Friend', () => {
	describe('add', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it.skip('success', async () => {
			const result = await Friend.add(db);
			assert.strictEqual(result.code, 200);
		});
    });
    
    describe('remove', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it.skip('success', async () => {
			const result = await Friend.remove(db);
			assert.strictEqual(result.code, 200);
		});
    });
    
    describe('get', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it.skip('success', async () => {
			const result = await Friend.get(db);
			assert.strictEqual(result.code, 200);
		});
    });
    
    describe('requests', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it.skip('success', async () => {
			const result = await Friend.requests(db);
			assert.strictEqual(result.code, 200);
		});
    });
    
    describe('respond', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it.skip('success', async () => {
			const result = await Friend.respond(db);
			assert.strictEqual(result.code, 200);
		});
    });
});
