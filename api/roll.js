import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/roll'

export default {
  getRollById: (id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?id=${id}`,
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

  postRoll: (roll) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        data: roll,
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

  putRoll: (id, roll) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'PUT',
        url: `${apiBase}?id=${id}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        data: roll,
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

  deleteRoll: (id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}?id=${id}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        data: null,
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