import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/user'
const sessionId = wx.getStorageSync('sessionId')
export default{
  getUserByToken: (token) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?token=${token}`,
        header: {
          'content-type': 'application/x-www-form-urlencoded', 
          'cookie': `gosessionid=${sessionId}`
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

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}/${id}?method=id`,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': `gosessionid=${sessionId}`
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

  postUser: (user) => {
    wx.request({
      method: 'POST',
      url: `${apiBase}`,
      header: {
        //'Authorization': `Bearer ${store.data.token}`
      },
      data: user,
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
  },

  putUser: (user) => {
    wx.request({
      method: 'PUT',
      url: `${apiBase}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': `gosessionid=${sessionId}`
      },
      data: user,
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
  }
}