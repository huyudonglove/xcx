// pages/shop/shop.js
const call=require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dm:[1],
    shop:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    let id=this.options.shopId;
    this.shopDetail(id);
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
  shopDetail(id){
    call.shopDetail(id).then(v=>{
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      let data=v.data;
      let url=wx.getStorageSync('currentUrl');
      data.dmList.map(r=>{
        if(r.imgs){
        let a=r.imgs.split(",");
        r.dmI=url+a[0]
        }else{
          r.dmI='../img/no.png'
        }
      })
      data.groupList.map(r=>{
        if(r.storyCoverImg){
          let a=r.storyCoverImg.split(",");
          r.storyI=url+a[0]
          }else{
            r.storyI='../img/no.png'
          }
          if(r.dmImg){
            let a=r.dmImg.split(",");
            r.dmI=url+a[0]
            }else{
              r.dmI='../img/no.png'
            }
        })
      if(data.shopInfo.shopImgs){
        let a=data.shopInfo.shopImgs.split(",");
        data.shopInfo.shopI=url+a[0]
      }
      if(data.shopInfo.shopLogoImgs){
        let a=data.shopInfo.shopLogoImgs.split(",");
        data.shopInfo.shopL=url+a[0]
      }else{
        data.shopInfo.shopL='../img/lo.png'
      }
      this.setData({
        shop:data
      })
    }
   )
  },
  callMe(){
    let phone=this.data.shop.shopInfo.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  }
})