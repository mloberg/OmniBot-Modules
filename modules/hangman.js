/**
 * Play a game of hangman.
 *
 * Listens:
 *   omnibot hangman
 *   hangman <guess>
 *
 * Config:
 *   wordnikApiKey: http://developer.wordnik.com/
 */

String.prototype.replaceAt = function(index, char) {
	return this.substr(0, index) + char + this.substr(index + 1);
};

var Game;

function Game(robot, room) {
	this.robot = robot;
	this.room = room;
	if (robot.config.wordnikApiKey == "") {
		robot.say(room, "I need a Wordnik API Key!");
	} else {
		this.generateWord();
	}
}

Game.prototype.word = "hangman";
Game.prototype.wordLength = 0;
Game.prototype.answerLetters = {};
Game.prototype.guessCount = 0;
Game.prototype.guessCorrect = 0;
Game.prototype.guessedLetters = [];
Game.prototype.guess = [];
Game.prototype.answer = ""
Game.prototype.isOver = false;
Game.prototype.isActive = false;

Game.prototype.generateWord = function() {
	var self = this;
	self.robot.helpers.getJSON({
		url: "http://api.wordnik.com/v4/words.json/randomWord",
		data: {
			hasDictionaryDef: true,
			minDictionaryCount: 3,
			minLength: 5
		},
		headers: {
			api_key: self.robot.config.wordnikApiKey
		},
		onSuccess: function(result) {
			if (result) {
				self.word = result.word;
			}
			self.word = self.word.toUpperCase();
			self.wordLength = self.word.length;
			for (var i = 0; i < self.wordLength; i++) {
				self.answer += "_";
				self.answerLetters[i] = self.word[i];
			};
			self.startGame();
		}
	});
};

Game.prototype.startGame = function() {
	this.isActive = true;
	this.robot.say(this.room, "Alright, I have a word. It's " + this.wordLength + " letters long.");
	this.robot.say(this.room, this.answer);
	this.robot.say(this.room, "You have 11 guesses.");
};

Game.prototype.play = function(command) {
	if (!command) {
		this.status();
	} else if (command.length > 1) {
		this.guessWord(command);
	} else {
		this.guessLetter(command);
	}
};

Game.prototype.status = function() {
	this.robot.say(this.room, "You have " + (11 - this.guessCount) + " guesses left.");
	this.robot.say(this.room, this.answer);
};

Game.prototype.guessWord = function(word) {
	word = word.toUpperCase();
	if (this.guess.indexOf(word) !== -1) {
		return this.robot.say(this.room, "You have already guessed " + word + ".");
	}
	if (word === this.word) {
		return this.wonGame();
	} else if (word.length !== this.wordLength) {
		this.robot.say(this.room, "The word is " + this.wordLength + " characters long. You gave me one that was " + word.length + ".");
	} else {
		this.guessCount++;
		this.guess.push(word);
		this.robot.say(this.room, "Sorry that is not the word.");
	}
	this.status();
};

Game.prototype.guessLetter = function(letter) {
	var count = 0;
	letter = letter.toUpperCase();
	if (this.guessedLetters.indexOf(letter) !== -1) {
		return this.robot.say(this.room, "You have already guessed " + letter);
	}
	this.guessedLetters.push(letter);
	for (var key in this.answerLetters) {
		if (this.answerLetters[key] === letter) {
			count++;
			this.guessCorrect++;
			key = parseInt(key, 10);
			this.answer = this.answer.replaceAt(key, letter);
		}
	}
	if (count === 0) {
		this.guessCount++;
		this.robot.say(this.room, "There are no " + letter + "'s.");
	} else {
		this.robot.say(this.room, "There " + (count === 1 ? "is " : "are ") + count + " " + letter + "'s.");
	}
	this.robot.say(this.room, this.answer);
	if (this.guessCorrect === this.wordLength) {
		this.wonGame();
	} else if (this.guessCount === 11) {
		this.gameOver();
	} else {
		this.robot.say(this.room, "You have " + (11 - this.guessCount) + " guesses left.");
	}
};

Game.prototype.wonGame = function() {
	this.robot.say(this.room, "Congratulations! You have won the game.");
	this.isOver = true;
};

Game.prototype.gameOver = function() {
	this.robot.say(this.room, "You have the lost game. The word was " + this.word + ".");
	this.isOver = true;
	this.isActive = false;
};

module.exports = function(robot) {
	var games = {};
	robot.hear(/(me) hangman/, function(match, room, from) {
		var game = games[room];
		if (!game || game.isOver) {
			robot.say(room, "No active game. Creating a new one.");
			games[room] = new Game(robot, room);
		} else {
			game.play(command);
		}
	});
	robot.hear(/hangman (.*)/, function(match, room, from) {
		var game = games[room];
		if (!game || game.isOver) {
			robot.say(room, "No active game.");
		} else {
			game.play(match[1]);
		}
	});
};
