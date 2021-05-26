// pages/detail/detail.js
var call=require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detailMsg:{},
      allRole:[],
      canIUseGetUserProfile:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(this.options);
      let user=wx.getStorageSync('hasUserInfo')||false;
      this.setData({
        hasUserInfo:user
      })
      if(user){
        this.getData();
      }
  },
  getUserProfile(e) {
    wx.login({
      success: res => {
        console.log(res)
        call.getLogin({jsCode:res.code}).then(v=>{
           this.getData();
        });
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
       
      }
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data);
        wx.setStorageSync('userInfo', res.userInfo);
        wx.setStorageSync('hasUserInfo', true);
        
      }
    })
  },
  getData(){
    call.getStoryGroupingDetail(this.options.id).then(v=>{
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      let data=v.data;
      //let url='http://10.10.30.143/files/';
      //let url='https://dev-mini.utopaxr.com:4430/test_images/';
      let url=wx.getStorageSync('currentUrl');
      if(data.shopLogoImg){
        let a=data.shopLogoImg.split(',');
        data.shopI=url+a[0]
      }else{
        data.shopI='../img/no.png';
      }
      if(data.storyCoverImg){
        let a=data.storyCoverImg.split(",");
        data.sI=url+a[0]
      }else{
        data.sI='../img/no.png'
      } 
      if(data.dmImg){
        let a=data.dmImg.split(",");
        data.dI=url+a[0]
      }else{
        data.dI='../img/nop.png'
      }    
      this.setData({
        detailMsg:data
      })
      call.getPaidOrderList(this.options.id).then(v=>{
       // console.log(this.data)
       this.setData({
         allRole:v.data
       })
       this.judgeRole();
    })
  });
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
  onShareAppMessage: function (options) {
    console.log(options)
    console.log(this);

    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
    　　　　title: "一起来打本，永远不会鸽！",        // 默认是小程序的名称(可以写slogan等)
    　　　　path: '/pages/detail/detail?id='+this.options.id,        // 默认是当前页面，必须是以‘/’开头的完整路径
    　　　　imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
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
    　　　　var eData = options.target.dataset;
    　　　　console.log( eData.name );     // shareBtn
    　　　　// 此处可以修改 shareObj 中的内容
    　　　　shareObj.path = '/pages/detail/detail';
    　　}
    　　// 返回shareObj
    　　return shareObj
  },
  goToPay(){
    wx.setStorageSync('detail', this.data.detailMsg)
    wx.navigateTo({
      url: '../pay/pay',
    })
  },
  /**判断数组 */
  judgeRole(){
    /*1有人 0没人 2不可选*/
    let allRoleC=this.data.allRole;
    if(this.data.detailMsg.totalCount==this.data.detailMsg.boughtCount){
      allRoleC.map(v=>{
        v.type=1
      })
      if(allRoleC.length!=10){
        let data=10-allRoleC.length;
        for(let i=0;i<=data;i++){
          allRoleC.push({type:2})
        }
      }
    }
    if(this.data.detailMsg.totalCount>this.data.detailMsg.boughtCount){
      allRoleC.map(v=>{
        v.type=1
      })
      let i1=this.data.detailMsg.totalCount-this.data.detailMsg.boughtCount;
      for(let i =0;i<i1;i++){
        allRoleC.push({type:0})
      }
      if(allRoleC.length!=10){
        
        let data=10-allRoleC.length;
        console.log(data)
        for(let i=0;i<=data;i++){
          allRoleC.push({type:2})
        }
      }
    }
    console.log(allRoleC,789);
    this.setData({
      allRole:allRoleC
    });
  },
  callMe(e){
    console.log(e.currentTarget)
    let phone=e.currentTarget.dataset.index;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  }
})