# Description:
#   Retrieve the weather.
# 
# Dependencies:
#   None
# 
# Configuration:
#   weather_zip = 55555
# 
# Commands:
#   omnibot forecast [<city>]
#   omnibot weather [<city>]
# 
# Author:
#   mloberg

module.exports = (robot) ->
  robot.respond /forecast ?(\d{5})/, (resp) ->
    zip = resp.match[1] or robot.config.weather_zip
    resp
      .http("http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%22#{zip}%22&format=json")
      .get() (err, res, body) ->
        weather = (JSON.parse body).query.results.channel.item
        for forecast in weather.forecast
          resp.send "#{forecast.day}: #{forecast.text} with a high of #{forecast.high} and a low of #{forecast.low}."
  robot.respond /weather ?(\d{5})/, (resp) ->
    zip = resp.match[1] or robot.config.weather_zip
    resp
      .http("http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%22#{zip}%22&format=json")
      .get() (err, res, body) ->
        weather = (JSON.parse body).query.results.channel.item
        resp.send "It is currently #{weather.condition.temp} and #{weather.condition.text}"