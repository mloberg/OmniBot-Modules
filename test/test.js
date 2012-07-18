var should = require("should"),
	OmniBot = require("omnibot"),
	irc = require("irc"),
	settings = require('./settings'),
	bot = new OmniBot.Bot("OmniBot", "irc", { server: settings.server, channels: [ "#omnibot" ] }),
	listener = new irc.Client(settings.server, "OmniBotListener", { channels: [ "#omnibot" ] });

describe("Modules", function() {
	it("can load modules", function(done) {
		bot.boot(function() {
			bot.loadModules('modules');
			bot.listen();
			done();
		});
	});

	describe("Join", function() {
		it("should welcome", function(done) {
			listener.addListener('message#omnibot', function(from, text, msg) {
				if (from === 'OmniBot' && text === 'Welcome foobar') {
					done();
				}
			});
			new irc.Client(settings.server, "foobar", { channels: [ "#omnibot" ] });
		});
	});

	describe("Funsies", function() {
		it("should respond", function() {
			bot.respondsTo('trap').should.be.true;
			bot.respondsTo('alot').should.be.true;
			bot.respondsTo('chuck norris').should.be.true;
		});

		it("should echo url", function(done) {
			listener.addListener('message#omnibot', function(from, text, msg) {
				if (from === 'OmniBot' && text.match(/(\.(gif|png|jpeg|jpg)$|youtube\.com)/)) {
					done();
				}
			});
			listener.say('#omnibot', 'trap');
		});
	});

	describe("Hangman", function() {
		it("should respond", function() {
			bot.respondsTo('OmniBot: hangman').should.be.true;
			bot.respondsTo('hangman guess').should.be.true;
		});

		it("should complain about API key", function(done) {
			var complained = false;
			listener.addListener('message#omnibot', function(from, text, msg) {
				if (from === 'OmniBot' && text === "I need a Wordnik API Key!") {
					complained = true;
				} else if (from === 'OmniBot' && text.match(/^Alright, I have a word/)) {
					if (complained) {
						done();
					}
				}
			});
			listener.say('#omnibot', 'OmniBot: hangman');
		});

		it("should play game", function(done) {
			listener.addListener('message#omnibot', function(from, text, msg) {
				if (from === 'OmniBot' && text === "Congratulations! You have won the game.") {
					done();
				}
			});
			listener.say('#omnibot', 'hangman hangman');
		});
	});

	describe("Math", function() {
		it("should respond", function() {
			bot.respondsTo('OmniBot: math expr').should.be.true;
		});

		it("should do math", function(done) {
			listener.addListener('message#omnibot', function(from, text, msg) {
				if (from === 'OmniBot' && text === '4') {
					done();
				}
			});
			listener.say('#omnibot', 'OmniBot: math 2 + 2');
		});
	});

	describe("Weather", function() {
		it("should respond", function() {
			bot.respondsTo('OmniBot: weather zip').should.be.true;
			bot.respondsTo('weather zip').should.be.true;
		});

		it("should report weather conditions", function(done) {
			bot.config.zipCode = settings.zipCode;
			listener.addListener('message#omnibot', function(from, text, msg) {
				if (from === "OmniBot" && text.match(/^It is currently/)) {
					done();
				}
			});
			listener.say('#omnibot', 'weather');
		});
	});

	describe("AWS", function() {
		it("should respond", function() {
			bot.respondsTo("OmniBot: AWS status").should.be.true;
		});

		it("should echo stats", function(done) {
			listener.addListener('message#omnibot', function(from, text, msg) {
				if (from === 'OmniBot' && text === 'Retrieving AWS status.') {
					done();
				}
			});
			listener.say('#omnibot', 'OmniBot: aws status');
		});
	});

	describe("Google", function() {
		it("should respond", function() {
			bot.respondsTo('OmniBot: google omnibot').should.be.true;
			bot.respondsTo('google omnibot').should.be.true;
			bot.respondsTo('This should not google omnibot').should.be.false;
		});

		it("should echo first search result", function(done) {
			var regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
			listener.addListener('message#omnibot', function(from, text, msg) {
				if (from === 'OmniBot' && text.match(regex)) {
					done();
				}
			});
			listener.say('#omnibot', 'google Matthew Loberg');
		});
	});
});
