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
      onOff:true,
      total:0,
      num:[],
      useGeshi:0,
      show:false,
      oneButton: [{text: '确定'}],
      showOneButtonDialog:false,
      percent:0.5
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
   //this.computedGeshi();
   //this.getAccount();
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
    this.getAccount();
    this.setData({
      useGeshi:0
    })
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
    "playTime": "",
    "integralAmount": 0,
    "inviteCode": ''
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
    msg.integralAmount=this.data.useGeshi*1000;
    msg.inviteCode=this.options.share;
    console.log(msg,9999);
    if(!msg.customerPhone){
      wx.showToast({
        title: '手机号码不为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    function isPhone(phone) {
      var myreg=/^1[3-9]\d{9}$/;
      if (myreg.test(phone)) {
          return true
      } else {
          return false
      }
    }
    let phone=isPhone(msg.customerPhone);
    console.log(phone,88888888)
    if(!phone){
      wx.showToast({
        title: '手机号码不正确',
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
      }else if(v.code==1003){
        wx.showToast({
          title: '人数已满',
          icon: 'error',
          duration: 2000
        })
      } else{
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
  },
  computedGeshi(){
    let n=Math.floor(this.data.total/1000);
    let canuse=parseInt((this.data.detail.groupPrice*this.data.percent)/10);//可以使用鸽屎
    let nc=[];
    if(n>canuse){
      for(let i=0;i<canuse;i++){
            let it={
              value:i,
              checked:false,
              disabled:!(this.data.detail.groupPrice>=(i+1)*10)
            }
            nc.push(it)
          }
    }
   if(n<=canuse){
    for(let i=0;i<n;i++){
      let it={
        value:i,
        checked:false,
        disabled:!(this.data.detail.groupPrice>=(i+1)*10)
      }
      nc.push(it)
    }
   }
    //console.log(nc,"nc")
    this.setData({
      num:nc
    })
  },
  getAccount(){
    call.getAccount().then(res=>{
        res.code&&(()=>{
          console.error(res)
        })();
        !res.code&&(()=>{
          let data=res.data.userAccount.balanceAmount-res.data.userAccount.freezeAmount;
          console.log(data,7777)
          this.setData({
            total:data
          })
          this.computedGeshi();
        })();
    })
  },
  radioChange(e){
    console.log(e);
    
    const items=this.data.num;
    let index=e.target.dataset.index;
    items.map(v=>{
      if(v.value==index){
        v.checked=!v.checked
      }else{
        v.checked=false
      }
    })
    this.setData({
      num:items
    })
  
    let i=0;
    var self=this;
    function aa(){
      if(i<items.length){
        if(items[i].checked){
          self.setData({
            useGeshi:items[i].value*1+1
          })
          return;
        }else{
          self.setData({
            useGeshi:0
          })
          i++;
          return aa();
        }
      }else{
        return
      }
    }
    aa();

  },
  changeShow(){
    this.setData({
      show:!this.data.show
    })
    var self=this;
    this.data.num.map(v=>{
      if(v.checked){
        self.setData({
          useGeshi:v.value*1+1
        })
      }
    })
  },
  noUse(){
    let num=this.data.num;
    num.map(v=>{
      v.checked=false
    });
    this.setData({
      num
    });
    this.setData({
      useGeshi:0
    });
    this.setData({
      show:!this.data.show
    })
  },
  getPhoneNumber (e) {
   
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData);
    let msg={
      iv:e.detail.iv,
      encryptedData:e.detail.encryptedData,
      type:2
    }
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      call.saveWx(msg).then(v=>{
        this.pay();
      })
      
    }else{
      this.pay();
      // wx.navigateTo({
      //   url: '../payS/payS',
      // })
      wx.showToast({
        title: '获取手机失败',
        icon: 'error',
        duration: 2000
      })
      
      return
    }

  },
  tapDialogButton(){
    this.setData({
      showOneButtonDialog: !this.data.showOneButtonDialog
    })
    this.setData({
      show:!this.data.show
    })
  },
  close(e){
    console.log(e);
    if(e.target.dataset.index==1){
      this.setData({
        show:!this.data.show
      })
    }
  }
})