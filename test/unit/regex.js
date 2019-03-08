const assert = require('assert');

const regex = require('../../tools/regex');

describe('regex', () => {
    describe('database', () => {
		it('success', () => {
			assert(regex.validateDatabase({}));
		});
	});

	describe('email', () => {
		it('success', () => {
			assert(regex.validateEmail('griff170@purdue.edu'));
		});

		describe('syntax', () => {
			it('empty string', () => {
				assert(!regex.validateEmail(''));
			});

			it('no @', () => {
				assert(!regex.validateEmail('griff170purdue.edu'));
			});

			it('no local-part', () => {
				assert(!regex.validateEmail('@purdue.edu'));
			});
	
			it('no domain', () => {
				assert(!regex.validateEmail('griff170@'));
			});
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateEmail());
			});

			it('number', () => {
				assert(!regex.validateEmail(null));
			});

			it('undefined', () => {
				assert(!regex.validateEmail(undefined));
			});

			it('number', () => {
				assert(!regex.validateEmail(1));
			});

			it('array', () => {
				assert(!regex.validateEmail([]));
			});

			it('object', () => {
				assert(!regex.validateEmail({}));
			});
		});
	});

	describe('username', () => {
		it('success', () => {
			assert(regex.validateUsername('todd'));
		});

		it('too short', () => {
			assert(!regex.validateUsername('to'));
		});

		it('too long', () => {
			assert(!regex.validateUsername('toddtoddtoddtoddtoddt'));
        });
        
        describe('has whitespace', () => {
			it('space', () => {
                assert(!regex.validateUsername('todd todd'));
            });

            it('tab', () => {
                assert(!regex.validateUsername('todd\ttodd'));
            });

            it('newline', () => {
                assert(!regex.validateUsername('todd\ntodd'));
            });

            it('return carriage', () => {
                assert(!regex.validateUsername('todd\rtodd'));
            });

            it('form feed', () => {
                assert(!regex.validateUsername('todd\ftodd'));
            });
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateUsername());
			});

			it('number', () => {
				assert(!regex.validateUsername(null));
			});

			it('undefined', () => {
				assert(!regex.validateUsername(undefined));
			});

			it('number', () => {
				assert(!regex.validateUsername(1));
			});

			it('array', () => {
				assert(!regex.validateUsername([]));
			});

			it('object', () => {
				assert(!regex.validateUsername({}));
			});
		});
	});

	describe('display_name', () => {
		it('success', () => {
			assert(regex.validateDisplayName('todd'));
		});

		it('too short', () => {
			assert(!regex.validateDisplayName(''));
		});

		it('too long', () => {
			assert(!regex.validateDisplayName('toddtoddtoddtoddtoddtoddtoddtod'));
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateDisplayName());
			});

			it('number', () => {
				assert(!regex.validateDisplayName(null));
			});

			it('undefined', () => {
				assert(!regex.validateDisplayName(undefined));
			});

			it('number', () => {
				assert(!regex.validateDisplayName(1));
			});

			it('array', () => {
				assert(!regex.validateDisplayName([]));
			});

			it('object', () => {
				assert(!regex.validateDisplayName({}));
			});
		});
	});

	describe('password', () => {
		it('success', () => {
			assert(regex.validatePassword('1234567890'));
		});

		it('too short', () => {
			assert(!regex.validatePassword('1234567'));
		});

		it('too long', () => {
			assert(!regex.validatePassword('1234567890123456789012345678901'));
        });

        describe('has whitespace', () => {
			it('space', () => {
                assert(!regex.validatePassword('todd todd'));
            });

            it('tab', () => {
                assert(!regex.validatePassword('todd\ttodd'));
            });

            it('newline', () => {
                assert(!regex.validatePassword('todd\ntodd'));
            });

            it('return carriage', () => {
                assert(!regex.validatePassword('todd\rtodd'));
            });

            it('form feed', () => {
                assert(!regex.validatePassword('todd\ftodd'));
            });
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validatePassword());
			});

			it('number', () => {
				assert(!regex.validatePassword(null));
			});

			it('undefined', () => {
				assert(!regex.validatePassword(undefined));
			});

			it('number', () => {
				assert(!regex.validatePassword(1));
			});

			it('array', () => {
				assert(!regex.validatePassword([]));
			});

			it('object', () => {
				assert(!regex.validatePassword({}));
			});
		});
    });
    
    describe('emoji', () => {
        it('success with emoji', () => {
			assert(regex.validateEmoji('🍆'));
		});

		it('success with string', () => {
			assert(regex.validateEmoji('eggplant'));
        });

        it('not an emoji', () => {
			assert(!regex.validateEmoji('todd'));
        });

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateEmoji());
			});

			it('number', () => {
				assert(!regex.validateEmoji(null));
			});

			it('undefined', () => {
				assert(!regex.validateEmoji(undefined));
			});

			it('number', () => {
				assert(!regex.validateEmoji(1));
			});

			it('array', () => {
				assert(!regex.validateEmoji([]));
			});

			it('object', () => {
				assert(!regex.validateEmoji({}));
			});
		});
	});

	describe('username_query', () => {
		it('success', () => {
			assert(regex.validateUsernameQuery('todd'));
		});

		it('too short', () => {
			assert(!regex.validateUsernameQuery(''));
		});

		it('too long', () => {
			assert(!regex.validateUsernameQuery('toddtoddtoddtoddtoddt'));
        });
        
        describe('has whitespace', () => {
			it('space', () => {
                assert(!regex.validateUsernameQuery('todd todd'));
            });

            it('tab', () => {
                assert(!regex.validateUsernameQuery('todd\ttodd'));
            });

            it('newline', () => {
                assert(!regex.validateUsernameQuery('todd\ntodd'));
            });

            it('return carriage', () => {
                assert(!regex.validateUsernameQuery('todd\rtodd'));
            });

            it('form feed', () => {
                assert(!regex.validateUsernameQuery('todd\ftodd'));
            });
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateUsernameQuery());
			});

			it('number', () => {
				assert(!regex.validateUsernameQuery(null));
			});

			it('undefined', () => {
				assert(!regex.validateUsernameQuery(undefined));
			});

			it('number', () => {
				assert(!regex.validateUsernameQuery(1));
			});

			it('array', () => {
				assert(!regex.validateUsernameQuery([]));
			});

			it('object', () => {
				assert(!regex.validateUsernameQuery({}));
			});
		});
    });
    
    describe('theme', () => {
		it('success w/ memes', () => {
			assert(regex.validateTheme('memes'));
        });

        it('success w/ fashion', () => {
			assert(regex.validateTheme('fashion'));
        });

        it('success w/ movie', () => {
			assert(regex.validateTheme('movie'));
        });

        it('success w/ music', () => {
			assert(regex.validateTheme('music'));
        });

        it('success w/ animals', () => {
			assert(regex.validateTheme('animals'));
        });

        it('success w/ nature', () => {
			assert(regex.validateTheme('nature'));
        });

        it('success w/ buildings', () => {
			assert(regex.validateTheme('buildings'));
        });

        it('success w/ cities', () => {
			assert(regex.validateTheme('cities'));
        });

        it('success w/ food', () => {
			assert(regex.validateTheme('food'));
        });

        it('success w/ beauty', () => {
			assert(regex.validateTheme('beauty'));
        });

        it('success w/ color', () => {
			assert(regex.validateTheme('color'));
        });

        it('success w/ space', () => {
			assert(regex.validateTheme('space'));
        });

        it('success w/ vehicles', () => {
			assert(regex.validateTheme('vehicles'));
        });

        it('success w/ sports', () => {
			assert(regex.validateTheme('sports'));
        });

        it('success w/ other', () => {
			assert(regex.validateTheme('other'));
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateTheme());
			});

			it('number', () => {
				assert(!regex.validateTheme(null));
			});

			it('undefined', () => {
				assert(!regex.validateTheme(undefined));
			});

			it('number', () => {
				assert(!regex.validateTheme(1));
			});

			it('array', () => {
				assert(!regex.validateTheme([]));
			});

			it('object', () => {
				assert(!regex.validateTheme({}));
			});
		});
    });
    
    describe('duration', () => {
        it('success', () => {
			assert(regex.validateDuration(1));
        });
        
        it('>= 1', () => {
			assert(!regex.validateDuration(0));
		});

		describe('not an integer', () => {
			it('nothing', () => {
				assert(!regex.validateDuration());
			});

			it('number', () => {
				assert(!regex.validateDuration(null));
			});

			it('undefined', () => {
				assert(!regex.validateDuration(undefined));
			});

			it('double', () => {
				assert(!regex.validateDuration(1.1));
            });
            
            it('string', () => {
				assert(!regex.validateDuration(''));
			});

			it('array', () => {
				assert(!regex.validateDuration([]));
			});

			it('object', () => {
				assert(!regex.validateDuration({}));
			});
		});
    });
    
    describe('poll id', () => {
        it('success', () => {
			assert(regex.validatePollId('1'));
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validatePollId());
			});

			it('number', () => {
				assert(!regex.validatePollId(null));
			});

			it('undefined', () => {
				assert(!regex.validatePollId(undefined));
			});

			it('number', () => {
				assert(!regex.validatePollId(1));
			});

			it('array', () => {
				assert(!regex.validatePollId([]));
			});

			it('object', () => {
				assert(!regex.validatePollId({}));
			});
		});
    });
    
    describe('poll vote', () => {
        it('success w/ 1', () => {
			assert(regex.validatePollVote(1));
        });
        
        it('success w/ 2', () => {
			assert(regex.validatePollVote(2));
        });
        
        it('vote === (1 || 2): 0', () => {
			assert(!regex.validatePollVote(0));
        });
        
        it('vote === (1 || 2): 3', () => {
			assert(!regex.validatePollVote(4));
		});

		describe('not a number', () => {
			it('nothing', () => {
				assert(!regex.validatePollVote());
			});

			it('number', () => {
				assert(!regex.validatePollVote(null));
			});

			it('undefined', () => {
				assert(!regex.validatePollVote(undefined));
			});

			it('string', () => {
				assert(!regex.validatePollVote(''));
			});

			it('array', () => {
				assert(!regex.validatePollVote([]));
			});

			it('object', () => {
				assert(!regex.validatePollVote({}));
			});
		});
    });
    
    describe('themes_query', () => {
		it('success w/ 1 theme', () => {
			assert(regex.validateThemesQuery('theme'));
        });
        
        it('success w/ 2 themes', () => {
			assert(regex.validateThemesQuery('theme,theme'));
        });
        
        it('success w/ 3 themes', () => {
			assert(regex.validateThemesQuery('theme,theme,theme'));
        });
        
        it('success w/ 4 themes', () => {
			assert(regex.validateThemesQuery('theme,theme,theme,theme'));
        });
        
        it('success w/ 5 themes', () => {
			assert(regex.validateThemesQuery('theme,theme,theme,theme,theme'));
        });
        
        describe('syntax', () => {
			it('empty string', () => {
				assert(!regex.validateThemesQuery(''));
            });
            
            it('ends w/ comma', () => {
				assert(!regex.validateThemesQuery('theme,'));
            });
		});
        
        describe('has whitespace', () => {
			it('space', () => {
                assert(!regex.validateThemesQuery('theme '));
            });

            it('space w/ comma', () => {
                assert(!regex.validateThemesQuery('theme, '));
            });

            it('tab', () => {
                assert(!regex.validateThemesQuery('theme\t'));
            });

            it('tab w/ comma', () => {
                assert(!regex.validateThemesQuery('theme,\t'));
            });

            it('newline', () => {
                assert(!regex.validateThemesQuery('theme\n'));
            });

            it('newline w/ comma', () => {
                assert(!regex.validateThemesQuery('theme,\n'));
            });

            it('return carriage', () => {
                assert(!regex.validateThemesQuery('theme\r'));
            });

            it('return carriage w/ comma', () => {
                assert(!regex.validateThemesQuery('theme,\r'));
            });

            it('form feed', () => {
                assert(!regex.validateThemesQuery('theme\f'));
            });

            it('form feed w/ comma', () => {
                assert(!regex.validateThemesQuery('theme,\f'));
            });
		});

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateThemesQuery());
			});

			it('number', () => {
				assert(!regex.validateThemesQuery(null));
			});

			it('undefined', () => {
				assert(!regex.validateThemesQuery(undefined));
			});

			it('number', () => {
				assert(!regex.validateThemesQuery(1));
			});

			it('array', () => {
				assert(!regex.validateThemesQuery([]));
			});

			it('object', () => {
				assert(!regex.validateThemesQuery({}));
			});
		});
    });

    describe('scope', () => {
        it('success w/ private', () => {
			assert(regex.validateScope('private'));
        });
        
        it('success w/ public', () => {
			assert(regex.validateScope('public'));
        });

        it('must be either private or public', () => {
			assert(!regex.validateScope(''));
        });

        it('must be either private or public', () => {
			assert(!regex.validateScope('hello'));
        });

        it('must be either private or public', () => {
			assert(!regex.validateScope('hello world'));
        });

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateScope());
			});

			it('number', () => {
				assert(!regex.validateScope(null));
			});

			it('undefined', () => {
				assert(!regex.validateScope(undefined));
			});

			it('number', () => {
				assert(!regex.validateScope(1));
			});

			it('array', () => {
				assert(!regex.validateScope([]));
			});

			it('object', () => {
				assert(!regex.validateScope({}));
			});
		});
    });

    describe('email verification hash', () => {
        it('success', () => {
			assert(regex.validateEmailVerificationHash('hash'));
        });

		describe('not a string', () => {
			it('nothing', () => {
				assert(!regex.validateEmailVerificationHash());
			});

			it('number', () => {
				assert(!regex.validateEmailVerificationHash(null));
			});

			it('undefined', () => {
				assert(!regex.validateEmailVerificationHash(undefined));
			});

			it('number', () => {
				assert(!regex.validateEmailVerificationHash(1));
			});

			it('array', () => {
				assert(!regex.validateEmailVerificationHash([]));
			});

			it('object', () => {
				assert(!regex.validateEmailVerificationHash({}));
			});
		});
    });
});
