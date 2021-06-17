// pages/myOrder/myOrder.js
var call=require("../../utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      order:[],
      current:4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    console.log(this.options)
    this.setData({
      current:this.options.id
    })
    if(this.data.current==4){
      this.getData('')
    }else{
      this.getData(this.data.current)
    }
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
    this.onRefresh();
  },
  onRefresh(){
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.onLoad();
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
  getData(id){
      call.getOrderList(id).then(v=>{
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        let data=v.data;
        let url=wx.getStorageSync('currentUrl');
        data.map(r=>{
          if(r.storyCoverImg){
          let a=r.storyCoverImg.split(",");
          r.sI=url+a[0]
          }else{
            r.sI='../img/no.png'
          }
        })
       
        this.setData({
          order:data
        })
      })
  },
  change(e){
      let id =e.currentTarget.dataset.index;
      console.log(id)
      this.setData({
        current:id
      })
      if(id==4){
        this.getData('')
      }else{
        this.getData(id)
      }
      
  }
})