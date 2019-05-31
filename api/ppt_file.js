import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/ppt_file'

export default {
  getPPTListByCourseid: (course_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?method=list&course_id=${course_id}`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
        },
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  getPPTById: (ppt_id) => {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: `${apiBase}?method=getfile&id=${ppt_id}`,
        success: function (res) {
          resolve(res)
        },
        fail: function(e){
          reject(e)
        }
      })

      wx.request({
        method: 'GET',
        url: `${apiBase}?method=getfile&id=${ppt_id}`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
        },
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  deletePPTById: (ppt_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}?id=${ppt_id}`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
        },
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
}