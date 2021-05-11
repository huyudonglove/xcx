export const API_URI = 'https://www.baidu.com'
 
function fetchApi(type, params, method) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${API_URI}/${type}`,
            data: params,
            methods: method || 'GET',
            header: {
                'content-type': 'json'
            },
            success: resolve,
            fail: reject
        })
    })
}
 
module.exports = {
    getData(){
      fetchApi('',{}).then(res=>{

      })
    }
}