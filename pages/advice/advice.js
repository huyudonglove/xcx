// pages/home/home.js
const call=require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      length:0,
      content:'',
      phone:'',
      button:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
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
  change(e){
    console.log(e);
    let index=e.target.dataset.index;
    if(index==1){
      if(e.detail.value.length<=200){
        this.setData({
          length:e.detail.value.length
        })
      }else{
        this.setData({
          length:200
        })  
      }
      
      this.setData({
        content:e.detail.value
      })  
    }
    if(index==2){
      this.setData({
        phone:e.detail.value
      })
    }
  },
  add(){
    let msg={
      content:this.data.content,
      phone:this.data.phone
    }
    if(msg.content.length<10){
      wx.showToast({
        title: '长度不够',
        icon: 'error',
        duration: 2000
      })
      return
    }
    this.setData({
      button:true
    })
    call.add(msg).then(res=>{
      this.setData({
        button:true
      })
      //console.log(res)
      if(res.code){
        wx.showToast({
          title: res.msg,
          icon: 'error',
          duration: 2000
        })
      }else{
       wx.navigateTo({
        url: '../payS/payS?page=advice',
      }) 
    }    
    })
  }
})