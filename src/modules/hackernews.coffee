# Description:
#   Retrieve the top stories from Hackernews 
#
# Dependencies:
#   "sax": "0.4.2"
#
# Commands:
#   omnibot HN - Get top Hacker News Item
#
# Author:
#   mloberg

sax = require 'sax'

parseFeed = (feed, cb) ->
  parser = sax.parser true
  item = null
  currentTag = null
  items = []
  count = 0

  parser.onclosetag = (tagName) ->
    tag_name = tagName.toLowerCase()
    if tag_name is 'item' or tag_name is 'entry'
      currentTag = item = null
      count++
      return
    if currentTag && currentTag.parent
      p = currentTag.parent
      delete currentTag.parent
      currentTag = p

  parser.onopentag = (tag) ->
    tag_name = tag.name.toLowerCase()
    return if tag_name isnt 'item' and tag_name isnt 'entry' and not item
    if tag_name is 'item'
      item = tag
      items[count] = {}
    tag.parent = currentTag
    tag.children = []
    tag.parent and tag.parent.children.push tag
    currentTag = tag

  parser.ontext = (text) ->
    if currentTag
      items[count][currentTag.name.toLowerCase()] = text

  parser.onend = ->
    cb items

  parser.write(feed).end()

module.exports = (robot) ->
  robot.respond /HN ?(\d*)/, (msg) ->
    count = msg.match[1] || 1
    msg
      .http('https://news.ycombinator.com/rss')
      .get() (err, res, body) ->
        parseFeed body, (items) ->
          for item in items[0...count]
            msg.send "#{item.title}: #{item.link} (#{item.comments})"
