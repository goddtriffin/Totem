const assert = require('assert');

const db_tool = require('../../tools/db');
let db;

const Poll = require('../../models/Poll');
const User = require('../../models/User');
const Friend = require('../../models/Friend');

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
            
            const signup1 = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant', false);
            assert.strictEqual(signup1.code, 200, signup1.data);
            const signup2 = await User.signup(db, 'test@test.test', 'test', 'testtest', '12345678', 'eggplant', false);
            assert.strictEqual(signup2.code, 200, signup2.data);

            const friend1 = await Friend.add(db, 'todd', 'test');
            assert.strictEqual(friend1.code, 200, friend1.data);
            const friend2 = await Friend.accept(db, 'test', 'todd');
            assert.strictEqual(friend2.code, 200, friend2.data);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.createChallenge(db, 'display_name', 'memes', 'todd', 'test', '1', 'public', 'image');
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.createChallenge(null);
				assert.strictEqual(result.code, 500, result.data);
            });
            
            it('invalid display_name', async () => {
				const result = await Poll.createChallenge(db, null);
				assert.strictEqual(result.code, 400, result.data);
            });
            
            it('invalid theme', async () => {
				const result = await Poll.createChallenge(db, 'display_name', null);
				assert.strictEqual(result.code, 400, result.data);
            });

            it('invalid creator', async () => {
				const result = await Poll.createChallenge(db, 'display_name', 'theme', null);
				assert.strictEqual(result.code, 400, result.data);
            });

            it('invalid opponent', async () => {
				const result = await Poll.createChallenge(db, 'display_name', 'theme', 'creator', null);
				assert.strictEqual(result.code, 400, result.data);
            });
            
            it('invalid duration', async () => {
				const result = await Poll.createChallenge(db, 'display_name', 'theme', 'creator', 'opponent', null);
				assert.strictEqual(result.code, 400, result.data);
            });
            
            it('invalid scope', async () => {
				const result = await Poll.createChallenge(db, 'display_name', 'theme', 'creator', 'duration', 'duration', null);
				assert.strictEqual(result.code, 400, result.data);
            });
		});
    });

    describe('getChallengeRequests', () => {
		before(async () => {
            db = await db_tool.create(':memory:', true, false, true);
            
            const signup1 = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant', false);
            assert.strictEqual(signup1.code, 200, signup1.data);
            const signup2 = await User.signup(db, 'test@test.test', 'test', 'testtest', '12345678', 'eggplant', false);
            assert.strictEqual(signup2.code, 200, signup2.data);

            const friend1 = await Friend.add(db, 'todd', 'test');
            assert.strictEqual(friend1.code, 200, friend1.data);
            const friend2 = await Friend.accept(db, 'test', 'todd');
            assert.strictEqual(friend2.code, 200, friend2.data);

            const poll = await Poll.createChallenge(db, 'display_name', 'memes', 'todd', 'test', '1', 'public', 'image');
            assert.strictEqual(poll.code, 200, poll.data);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.getChallengeRequests(db, 'test');
            assert.strictEqual(result.code, 200, result.data);
            assert.strictEqual(result.data.length, 1, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.getChallengeRequests(null);
				assert.strictEqual(result.code, 500, result.data);
            });
            
            it('invalid username', async () => {
				const result = await Poll.getChallengeRequests(db, null);
				assert.strictEqual(result.code, 400, result.data);
			});
		});
    });
    
    describe('acceptChallengeRequest', () => {
		before(async () => {
            db = await db_tool.create(':memory:', true, false, true);
            
            const signup1 = await User.signup(db, 'griff170@purdue.edu', 'todd', 'goddtriffin', '12345678', 'eggplant', false);
            assert.strictEqual(signup1.code, 200, signup1.data);
            const signup2 = await User.signup(db, 'test@test.test', 'test', 'testtest', '12345678', 'eggplant', false);
            assert.strictEqual(signup2.code, 200, signup2.data);

            const friend1 = await Friend.add(db, 'todd', 'test');
            assert.strictEqual(friend1.code, 200, friend1.data);
            const friend2 = await Friend.accept(db, 'test', 'todd');
            assert.strictEqual(friend2.code, 200, friend2.data);

            const poll = await Poll.createChallenge(db, 'display_name', 'memes', 'todd', 'test', '1', 'public', 'image');
            assert.strictEqual(poll.code, 200, poll.data);
		});

		after(async () => {
			await db.destroy();
			db = null;
		});

		it('success', async () => {
			const result = await Poll.acceptChallengeRequest(db, '1', 'test', 'image');
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.acceptChallengeRequest(null);
				assert.strictEqual(result.code, 500, result.data);
            });
            
            it('invalid id', async () => {
				const result = await Poll.acceptChallengeRequest(db, null);
				assert.strictEqual(result.code, 400, result.data);
            });
            
            it('invalid username', async () => {
				const result = await Poll.acceptChallengeRequest(db, 'id', null);
				assert.strictEqual(result.code, 400, result.data);
            });
		});
    });
    
    describe('searchPrivate', () => {
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
			const result = await Poll.searchPrivate(db, 'todd', 'theme,theme');
			assert.strictEqual(result.code, 200, result.data);
		});

		describe('validate parameters', () => {
			it('invalid database', async () => {
				const result = await Poll.searchPrivate(null);
				assert.strictEqual(result.code, 500, result.data);
            });
            
            it('invalid username', async () => {
				const result = await Poll.searchPrivate(db, null);
				assert.strictEqual(result.code, 400, result.data);
            });
            
            it('invalid themes_query', async () => {
				const result = await Poll.searchPrivate(db, 'username', null);
				assert.strictEqual(result.code, 400, result.data);
			});
		});
    });

    describe('searchPublic', () => {
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
