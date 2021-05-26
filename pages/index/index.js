// index.js
// 获取应用实例
var call=require("../../utils/api")
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    listData:[],
    current:1,
    index:'',
    inputValue:null
  },
  // 事件处理函数
  bindViewTap() {
    console.log(this.data)
  },
  onPullDownRefresh: function () {
    this.onRefresh();
  },
  onRefresh(){
    //在当前页面显示导航条加载动画
    //wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.onLoad();
  },
  onLoad() {
    
    let user=wx.getStorageSync('hasUserInfo')||false;
    this.setData({
      hasUserInfo:user
    })
    wx.setStorageSync('currentUrl', 'https://dev-mini.utopaxr.com:4430/test_images/')
    call.listStoryGroup('').then(v=>{
      //wx.stopPullRefresh();
      let data=v.data;
     // let url='http://10.10.30.143/files/'
     let url=wx.getStorageSync('currentUrl');
      data.map(r=>{
        if(r.storyCoverImg){
          let a=r.storyCoverImg.split(",");
          r.sI=url+a[0]
        }else{
          r.sI='../img/no.png'
        }
      })
      console.log(data,999999)
      this.setData({
        listData:data
      })
      wx.stopPullDownRefresh();
      wx.hideLoading();
     // wx.hideNavigationBarLoading();
      

    }).catch(err=>{
      
    });
    if (wx.getUserProfile) {
     // console.log(777777)
      this.setData({
        canIUseGetUserProfile: true
      });
    }
  },
  getUserProfile(e) {
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
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow:function(){
    //this.onLoad();
  },
  goTo(e){
    //console.log(this.data.userInfo)；
    this.setData({
      'inputValue': ''
      });
    var key=e.currentTarget.dataset.index;
    console.log(this)
    if(key==1){
      this.onLoad();
      this.setData({
        current:1
       })
    }
     if(key==2){
      this.setData({
        current:2
       })
     }
  },
  goToOrder(e){
    console.log(e)
    let id=e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../myOrder/myOrder?id='+id
    })
  },
  goToDetail(e){
    console.log(e.currentTarget.dataset.index);
    var b=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../detail/detail?id=${b}`,
    })
  },
  getInput(e){
    console.log(e)
    var value=e.detail.value;
    this.setData({
      inputValue:value
    });
    this.search(value);
  },
  search(value){
    call.listStoryGroup(value).then(v=>{
      let data=v.data;
     // let url='http://10.10.30.143/files/'
     //let url='https://dev-mini.utopaxr.com:4430/test_images/';
     let url=wx.getStorageSync('currentUrl');
      data.map(r=>{
        if(r.storyCoverImg){
          let a=r.storyCoverImg.split(",");
          r.sI=url+a[0]
        }else{
          r.sI=null
        }
      })
      console.log(data,999999)
      this.setData({
        listData:data
      })
    }).catch(err=>{
      
    });
  },
  onShareAppMessage: function (options) {
    console.log(options)
    console.log(this);

    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
    　　　　title: "一起来打本，永远不会鸽！",        // 默认是小程序的名称(可以写slogan等)
    　　　　path: '/pages/index/index',        // 默认是当前页面，必须是以‘/’开头的完整路径
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
  }
})
