/**
 * Welcome a user when they join the room.
 */

module.exports = function(robot) {
	robot.connection.client.addListener('join', function(room, nick, msg) {
		robot.say(room, "Welcome " + nick);
	});
};
