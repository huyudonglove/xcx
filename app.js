// app.js
var call=require("./utils/api")
App({
  onLaunch() {
    // 展示本地存储能力

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        call.getLogin({jsCode:res.code});
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

      }
    })
  },
  globalData: {
    userInfo: null
  }
})
