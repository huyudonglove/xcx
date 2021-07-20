//export const API_URI = 'http://10.10.26.87:4432'
//wx.setStorageSync('currentUrl', 'https://dev-mini.utopaxr.com:4430/images/');
//wx.setStorageSync('currentUrl', 'https://happy.laidaben.com/images/');
//wx.setStorageSync('currentUrl', 'http://10.10.30.143/files/');
export const API_URI = 'https://dev-mini.utopaxr.com:4430/api_client'
//export const API_URI = 'https://happy.laidaben.com/api_client'
var token;
function fetchApi(type, params, method) {
    //console.log(type,params,method,7777777777)
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${API_URI}${type}`,
            data: params||null,
            method: method || 'GET',
            header: {
                'content-type': 'application/json; charset=utf-8',
                'clent-authorization':token||''
            },
            success: resolve,
            fail: reject
        })
    })
}
 
module.exports = {
    getFile(){
       return new Promise((resolve,reject)=>{
        fetchApi(`/api/file/get/fileServer`).then(res=>{
            resolve(res.data)
            wx.setStorageSync('currentUrl', res.data.msg)
        }).catch(r=>{
    
        })  
       }) 
    },
    orderDetail(id){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi(`/api/client/order/orderDetail?orderId=${id}`).then(res=>{
                resolve(res.data)
            }).catch(r=>{

            })  
        }).catch(err=>{
            reject(err)
        })    
    },
    orderRefund(id){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/order/orderRefund',{orderId:id,type:1},"POST").then(res=>{
                resolve(res.data)
            }).catch(r=>{

            })  
        }).catch(err=>{
            reject(err)
        }) 
    },
    add(params){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/feedback/add',params,"POST").then(res=>{
                resolve(res.data)
            }).catch(r=>{

            })  
        }).catch(err=>{
            reject(err)
        })
    },
    shopDetail(shopId){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi(`/api/client/home/cShopDetail?shopId=${shopId}`).then(res=>{
                resolve(res.data)
            }).catch(r=>{

            })  
        }).catch(err=>{
            reject(err)
        }) 
    },
    getLogin(params){
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/customer/wxLogin',params,"POST").then(res=>{
            let data=JSON.stringify(res.data.data);
            wx.setStorageSync('user', data);
            wx.setStorageSync('token', res.data.data.token)
            resolve(res)
        }).catch(r=>{
            reject(r)
        })
      })
        
    },
    listStoryGroup(storyTitle){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/home/listStoryGroup',{storyTitle:storyTitle}).then(res=>{
                resolve(res.data)
            }).catch(r=>{

            })  
        }).catch(err=>{
            reject(err)
        })    
    },
    getStoryGroupingDetail(groupId){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/home/storyGroupingDetail',{groupId:groupId}).then(res=>{
                resolve(res.data)
            })  
        }) 
    },
    prePay(param){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/order/prepay',param,'POST').then(res=>{
                resolve(res.data)
            })  
        })
    },
    getOrderList(id){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/order/orderList',{orderStatus:id}).then(res=>{
                resolve(res.data)
            })  
        }) 
    },
    getPaidOrderList(groupId){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/order/paidOrderList',{groupId:groupId}).then(res=>{
                resolve(res.data)
            }).catch(r=>{
                reject(r.data)
            })  
        }) 
    },
    getAccount(){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/customer/account','','POST').then(res=>{
                let data=res.data.data.userAccount.balanceAmount-res.data.data.userAccount.freezeAmount;
                wx.setStorageSync('geShi', data);
                resolve(res.data)
            }).catch(r=>{
                reject(r.data)
            })  
        }) 
    },
    getGeList(params){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/customer/getPigeonDetail',params,'POST').then(res=>{
                resolve(res.data)
            }).catch(r=>{
                reject(r.data)
            })  
        }) 
    },
    saveWx(params){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/customer/saveWxUserData',params,'POST').then(res=>{
                resolve(res.data)
            }).catch(r=>{
                reject(r.data)
            })  
        }) 
    },
    getShare(){
        token=wx.getStorageSync('token');
        return new Promise((resolve,reject)=>{
            fetchApi('/api/client/home/getShareConfig').then(res=>{
                wx.setStorageSync('share', res.data.data);
                resolve(res.data)
            }).catch(r=>{
                reject(r.data)
            })  
        }) 
    }
}
