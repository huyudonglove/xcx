// pages/payS/payS.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function (options) {
    console.log(this);
    let inviteC=wx.getStorageSync('user');
    let invite=JSON.parse(inviteC).inviteCode;
    console.log(inviteC,invite)
    let detail=wx.getStorageSync('detail');
    let msg=`${wx.getStorageSync('userInfo').nickName}喊你一起来打本~`;
    let share=wx.getStorageSync('share');
    console.log('/pages/detail/detail?id='+detail.storyId+'&share='+invite)
    if(share.messageLocation==1){
      msg=msg+share.title
    }
    if(share.messageLocation==2){
      msg=share.title+msg;
    }
    if(share.messageLocation==3){
      msg=share.title;
    }
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
    　　　　title: msg,        // 默认是小程序的名称(可以写slogan等)
    　　　　path: '/pages/detail/detail?id='+detail.groupId+'&share='+invite,        // 默认是当前页面，必须是以‘/’开头的完整路径
    　　　　imageUrl: detail.sI,     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    　　　　success: function(res){
    　　　　　　// 转发成功之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
    　　　　　　}
    　　　　},
    　　　　fail: function(){
    　　　　　　// 转发失败之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
    　　　　　　　　// 用户取消转发
    　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
    　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
    　　　　　　}
    　　　　},
    　　};
    　　// 来自页面内的按钮的转发
    　　if( options.from == 'button' ){
    　　　　// 此处可以修改 shareObj 中的内容
    　　　　shareObj.path = '/pages/detail/detail?id='+detail.groupId+'&share='+invite;
    　　}
    　　// 返回shareObj
    　　return shareObj

  },
  goBack(){
    wx.navigateTo({
      url: '../index/index',
    })
  }
})