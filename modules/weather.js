/**
 * Retrieve the weather.
 *
 * Listens:
 *   omnibot weather [zip code]
 *   weather [zip code]
 *
 * Config:
 *   zipCode: Zip code to use if none is supplied.
 */

function getWeather(robot, room, zip) {
	robot.helpers.getJSON({
		url: 'http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%22' + zip + '%22&format=json',
		onSuccess: function(result) {
			var weather = result.query.results.channel.item;
			robot.say(room, "It is currently " + weather.condition.temp + " and " + weather.condition.text);
		}
	});
}

module.exports = function(robot) {
	robot.hear(/(me) weather ?(\d{5})?/, function(match, room, from) {
		var zip = match[1] ? match[1] : robot.config.zipCode;
		getWeather(robot, room, zip);
	});
	robot.hear(/weather ?(\d{5})?/, function(match, room, from) {
		var zip = match[1] ? match[1] : robot.config.zipCode;
		getWeather(robot, room, zip);
	});
};
