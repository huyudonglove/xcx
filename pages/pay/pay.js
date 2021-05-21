// pages/pay/pay.js
var call=require("../../utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      detail:{},
      month:'',
      day:'',
      phone:'',
      onOff:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.setData({
      userInfo: wx.getStorageSync('userInfo') 
    })
   this.setData({
     detail:wx.getStorageSync('detail') 
   })
   //console.log(new Date().getDate(),new Date().getMonth())
   this.setData({
     month:new Date().getMonth()+1
   })
   this.setData({
     day:new Date().getDate()
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getNumber(e){
    var value=e.detail.value
    this.setData({
      phone:value
    })
  },
  pay(){
    let msg={
    "nickName": "",
    "avatarUrl": "",
    "groupId": "",
    "storyId": "",
    "storyTitle": "",
    "storyCoverImg": "",
    "shopId":"",
    "shopAddress": "",
    "customerPhone": "",
    "playTime": ""
    };
    let detail=this.data.detail;
    msg.nickName=this.data.userInfo.nickName;
    msg.avatarUrl=this.data.userInfo.avatarUrl;
    msg.groupId=detail.groupId;
    msg.storyId=detail.storyId;
    msg.storyTitle=detail.storyTitle;
    msg.storyCoverImg=detail.storyCoverImg;
    msg.shopId=detail.shopId;
    msg.shopAddress=detail.shopAddress;
    msg.customerPhone=this.data.phone;
    msg.playTime=detail.playTime;
    console.log(msg,9999);
    if(!msg.customerPhone){
      wx.showToast({
        title: '手机号码不为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    this.setData({
      onOff:false
    })
    call.prePay(msg).then(v=>{
      this.setData({
        onOff:true
      })
      if(!v.code){
        wx.navigateTo({
          url: '../payS/payS',
        })
      }else{
        wx.showToast({
          title: '拼团失败',
          icon: 'error',
          duration: 2000
        })
      }
     
    }).catch(r=>{
      wx.navigateTo({
        url: '../payS/payS',
      })
    })
  }
})