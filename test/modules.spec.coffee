Path = require 'path'
helper = require './helper'

describe 'Modules', ->
  robot = null
  beforeEach ->
    robot = new helper.Robot

  it 'should respond to aws', (done) ->
    require(Path.resolve('./src/modules/aws'))(robot)
    robot.call 'aws status', /Route 53/, done

  it 'should respond to HN', (done) ->
    require(Path.resolve('./src/modules/hackernews'))(robot)
    robot.call 'HN 1', /https?:\/\//, done

  it 'should tell joke', (done) ->
    require(Path.resolve('./src/modules/joke'))(robot)
    robot.call 'joke', /\?$/, done

  it 'should get weather', (done) ->
    require(Path.resolve('./src/modules/weather'))(robot)
    robot.call 'weather 55337', /It is currently/, done
