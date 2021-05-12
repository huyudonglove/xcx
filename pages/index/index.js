// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    listData:[1,2,3,4,5],
    current:1
  },
  // 事件处理函数
  bindViewTap() {
    console.log(this.data)
  },
  onLoad() {
    //console.log(getCurrentPages())
    if (wx.getUserProfile) {
     // console.log(777777)
      this.setData({
        canIUseGetUserProfile: true
      });
      //this.goTo()
      //console.log(this);
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
  goTo(e){
    console.log(this.data.userInfo)
    var key=e.currentTarget.dataset.index;
    console.log(this)
    if(key==1){
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
  goToOrder(){
    wx.navigateTo({
      url: '../myOrder/myOrder'
    })
  },
  goToDetail(e){
    console.log(e.currentTarget.dataset.index);
    var b=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../detail/detail?id=${b}`,
    })
  }
})
