/**
 * Retrieve the status of AWS services.
 *
 * Listens:
 *   omnibot aws status
 *
 * Dependencies:
 *   YQL (npm install yql)
 */

var YQL = require("yql");

var services = [
	"Amazon Elastic Compute Cloud (N. Virginia)",
	"Amazon CloudFront",
	"Amazon Elastic Compute Cloud (N. California)",
	"Amazon Route 53"
];

module.exports = function(robot) {
	robot.hear(/(me) aws status/, function(match, room, from) {
		robot.say(room, "Retrieving AWS status.");
		new YQL.exec("select * from html where url='http://status.aws.amazon.com' and xpath='//div[@id=\"NA_block\"]/table/tbody/tr/td'", function(resp) {
			var results = resp.query.results.td;
			for (var i = 0; i < results.length; i++) {
				if (services.indexOf(results[i].p) !== -1) {
					var service = results[i].p.replace("Amazon ", '').replace("Elastic Compute Cloud", "EC2");
					i++;
					var status = (results[i].div) ? results[i].div[0] : results[i];
					robot.say(room, service + ': ' + status.p);
				}
			};
		});
	});
};
