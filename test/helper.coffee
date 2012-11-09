httpClient = require 'scoped-http-client'

class Robot
  constructor: ->
    @listeners = []

  respond: (regex, callback) ->
    @listeners.push { regex: regex, callback: callback }

  hear: (regex, callback) ->
    @listeners.push { regex: regex, callback: callback }

  call: (text, regex, done) ->
    for listener in @listeners
      if match = text.match listener.regex
        listener.callback new Response(match, regex, done)

class Response
  constructor: (@match, @regex, @done) ->

  http: (url) ->
    httpClient.create(url)

  random: (items) ->
    items[Math.floor(Math.random() * items.length)]

  send: (message) ->
    if message.match @regex
      @done()

exports.Robot = Robot
