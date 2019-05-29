import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/charge_course'

export default {
  getByCourseId: (course_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?course_id=${course_id}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        success: res => {
          if (res.statusCode != 200 || res.data.status == "failed") {
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

  deleteByCourseId: (course_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}?course_id=${course_id}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        success: res => {
          if (res.statusCode != 200 || res.data.status == "failed") {
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

  postChargeCourse: (chargeCourse) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        data: chargeCourse,
        success: res => {
          if (res.statusCode != 200 || res.data.status == "failed") {
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

}