# Description:
#   Retrieve the status of AWS services.
# 
# Dependencies:
#   "yql": "0.4.7"
# 
# Configuration:
#   aws_services = [ 'list of services' ]
# 
# Commands:
#   omnibot aws status
# 
# Author:
#   mloberg

YQL = require 'yql'

default_services = [
  "Amazon Elastic Compute Cloud (N. Virginia)",
  "Amazon CloudFront",
  "Amazon Elastic Compute Cloud (N. California)",
  "Amazon Route 53"
]

module.exports = (robot) ->
  services = robot.aws_services or default_services
  robot.respond /aws status/i, (resp) ->
    resp.send "Retrieving AWS status."
    new YQL.exec "select * from html where url='http://status.aws.amazon.com' and xpath='//div[@id=\"NA_block\"]/table/tbody/tr/td'", (res) ->
      results = res.query.results.td
      i = 0
      while i < results.length
        if services.indexOf(results[i].p) isnt -1
          service = results[i].p.replace("Amazon", "").replace("Elastic Compute Cloud", "EC2")
          i++
          status = (if (results[i].div) then results[i].div[0] else results[i])
          resp.send "#{service}: #{status.p}"
        i++
