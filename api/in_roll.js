import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/in_roll'
const sessionId = wx.getStorageSync('sessionId')
export default {
  getInrollById: (roll_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?roll_id=${roll_id}`,
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

  getInrollByTime: (time) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?time=${time}`,
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

  postInroll: (inroll) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
        },
        data: inroll,
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