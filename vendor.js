import regeneratorRuntime from 'regenerator-runtime'
global.regeneratorRuntime = regeneratorRuntime

import util from './utils/util'
global.util = util

import _ from 'lodash'
global._ = _

import * as R from 'ramda'
global.R = R

const asyncWrap = fn => (options = {}) =>
  new Promise(reslove => {
    let conf = {
      success: res => {
        console.log(res)
        reslove(res)
      },
      fail: err => {
        console.log(err)
        reject(err)
      }
    }

    wx.canIUse(fn) && wx[fn](R.merge(conf, options))
  })

wx.loginAsync = asyncWrap('login')
wx.getSystemInfoAsync = asyncWrap('getSystemInfo')
wx.getUserInfoAsync = asyncWrap('getUserInfo')
wx.reqAsync = asyncWrap('request')

//转场动画
let lastTime = 0

global.requsetAnimationFrame = callback => {
  const currentTime = new Date().getTime()
  const timeToCall = Math.max(0, 16 - (currentTime - lastTime))
  const timer = global.setTimeout(function() {
    callback(currentTime + timeToCall)
  }, timeToCall)

  lastTime = currentTime + timeToCall

  return timer
}

global.cancelAnimationFrame = timer => {
  clearTimeout(timer)
}

import TWEEN from 'tween.js'

TWEEN.now = function() {
  return new Date().getTime()
}

global.TWEEN = TWEEN
