/**
 * Get the first result on Google for a term.
 *
 * Listens:
 *   omnibot google <search term>
 *   google <search term>
 */

module.exports = function(robot) {
	robot.hear(/^((me) )?google (.*)/, function(match, room, from) {
		var query = match[2];
		if (query === "google") {
			robot.say(room, "You'll break the Internet!");
		} else {
			robot.helpers.get({
				url: 'http://www.google.com/search',
				data: {
					q: query
				},
				onSuccess: function(result) {
					var res = result.match(/class="r"><a href="\/url\?q=([^"]*)(&amp;sa.*)">/);
					res = res[1] || "Sorry, Google had zero results for '#{query}'";
					return robot.say(room, res);
				}
			});
		}
	});
};
