/**
 * Send a math eqation to Google.
 *
 * Listens:
 *   onmibot math <equation>
 */

module.exports = function(robot) {
	robot.hear(/(me) math (.*)/, function(match, room, from) {
		robot.helpers.get({
			url: 'http://www.google.com/ig/calculator',
			data: {
				h1: 'en',
				q: match[1]
			},
			headers: {
				'Accept-Language': 'en-us,en;q=0.5',
				'Accept-Charset': 'utf-8',
				'User-Agent': "Mozilla/5.0 (X11; Linux x86_64; rv:2.0.1) Gecko/20100101 Firefox/4.0.1"
			},
			onSuccess: function(result) {
				// eval is dirty, but result includes non-string keys, so JSON.parse doesn't work
				result = eval("(" + result + ")");
				var res = result.rhs.replace('&#215;', 'x').replace(/<sup>(\d+)<\/sup>/, "^$1");
				robot.say(room, res || "Could not compute.");
			}
		});
	});
};
