# Description:
#   Say hello to users as they join.
# 
# Dependencies:
#   None
# 
# Configuration:
#   None
# 
# Commands:
#   None
# 
# Author:
#   mloberg

module.exports = (robot) ->
  robot.connection.addListener 'join', (channel, nick, message) ->
    robot.say channel, "Welcome #{nick}." if nick isnt robot.name
