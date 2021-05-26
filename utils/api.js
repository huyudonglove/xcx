//export const API_URI = 'http://10.10.30.143:4431'
export const API_URI = 'https://dev-mini.utopaxr.com:4430/test_interface'
//export const API_URI = 'https://www.baidu.com'
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
    
}