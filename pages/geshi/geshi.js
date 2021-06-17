// pages/geshi/geshi.js
var call=require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      page:1,
      limit:10,
      total:[],
      geShi:0,
      max:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.getAccount();
    this.getGeList();
  },
  getAccount(){
    call.getAccount().then(v=>{
      this.setData({
        geShi:wx.getStorageSync('geShi')
      })
    });
  },
  getGeList(page){
    let data={
      "pageNum": page||1,
      "pageSize": 10,
      "isAsc": "desc",
      "orderByColumn": "createTime"
    }
    call.getGeList(data).then(res=>{
      console.log(res,888888888);
      let data=this.data.total.concat(res.data.rows)
      this.setData({
        total:data
      })
      this.setData({
        max:Math.ceil(res.data.total/10)
      })
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
    if(this.data.page<this.data.max){
      console.log(this.data.page);
      let page=++this.data.page;
      console.log(page)
      this.setData({
        page
      })
      this.getGeList(page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})