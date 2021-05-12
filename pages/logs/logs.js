// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad() {
  },
  goTo(){
    wx.navigateTo({
      url: '../test/test.exml'
    })
  }
})
