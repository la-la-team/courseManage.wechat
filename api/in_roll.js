import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/in_roll'

export default {
  getInrollById: (roll_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?roll_id=${roll_id}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
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
          //'Authorization': `Bearer ${store.data.token}`
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
          //'Authorization': `Bearer ${store.data.token}`
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