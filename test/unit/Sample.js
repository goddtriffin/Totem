const assert = require('assert');

const db_tool = require('../../tools/db');
let db;

const Sample = require('../../models/Sample');

describe('Sample', () => {
	describe('routeModel', () => {
		before(async () => {
			db = await db_tool.create(':memory:', true, false, true);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('unimplemented', async () => {
			const result = await Sample.routeModel(db);
			assert.strictEqual(result.code, 501, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Sample.routeModel(null);
				assert.strictEqual(result.code, 500, result.data);
			});
		});
    });
});
