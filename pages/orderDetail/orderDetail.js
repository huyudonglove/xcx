// pages/orderDetail/orderDetail.js
import drawQrcode from 'weapp-qrcode-canvas-2d'
const call=require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'88888888',
    order:{},
    showOneButtonDialog:false,
    oneButton: [{text: '我知道了'}],
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
    this.getOrder();
    this.draw();
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
  draw(){
    if(this.data.order.orderStatus!=2){
      return
    }
    const query = wx.createSelectorQuery()
    query.select('#myQrcode')
    .fields({
        node: true,
        size: true
    })
    .exec((res) => {
        var canvas = res[0].node

        // 调用方法drawQrcode生成二维码
        drawQrcode({
            canvas: canvas,
            canvasId: 'myQrcode',
            width: 200,
            padding:60,
            background: '#ffffff',
            foreground: '#000000',
            text: this.data.order.verifyCode,
        })

        // 获取临时路径（得到之后，想干嘛就干嘛了）
        wx.canvasToTempFilePath({
            canvasId: 'myQrcode',
            canvas: canvas,
            x: 0,
            y: 0,
            width: 200,
            height: 200,
            destWidth: 200,
            destHeight: 200,
            success(res) {
                console.log('二维码临时路径：', res.tempFilePath)
            },
            fail(res) {
                console.error(res)
            }
        })
    })
  },
  setClipboard(){
    wx.setClipboardData({
      data: this.data.order.verifyCode,
      success: function (res) {
        console.log("复制成功:", res)
      }
    }) 
  },
  goTo(){
    let id=this.data.order.shopId;
    wx.navigateTo({
      url: `../shop/shop?shopId=${id}`,
    })
  },
  getOrder(){
    console.log(call)
    this.setData({
      order:wx.getStorageSync('currentOrder')
    });
    let id=this.data.order.orderId;
    var self=this;
    let url=wx.getStorageSync('currentUrl');
    call.orderDetail(id).then(v=>{
      let r=v.data;
      if(r.storyCoverImg){
        let a=r.storyCoverImg.split(",");
        r.sI=url+a[0]
        }else{
          r.sI='../img/no.png'
        }
        if(r.shopLogoImgs){
          let a=r.shopLogoImgs.split(",");
          r.shopI=url+a[0]
        }else{
            r.shopI='../img/lo.png'
        }
      self.setData({
        order:r
      });
    })
  },
  orderRefund(){
    var self=this;
    wx.showModal({
        title: '提示',
        content: '是否需要申请退款？',
        success: function(res) {
          if (res.confirm) {
            call.orderRefund(self.data.order.orderId).then(()=>{
              self.setData({
                showOneButtonDialog:true
              })
              self.getOrder();
            })
          } else if (res.cancel) {
            return
          }
        }
      })
  },
  tapDialogButton(){
    this.setData({
      showOneButtonDialog:false
    })
  },
  callMe(){
    let phone=this.data.order.shopPhone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  }
})