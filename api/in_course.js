import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/in_course'

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

  getByCourseIdAndStuId: (course_id, student_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?course_id=${course_id}&student_id=${student_id}`,
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

  postIncourse: (incourse) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        data: incourse,
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

  deleteIncourse: (courseId, studentId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}?course_id=${courseId}&student_id=${studentId}`,
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
  },

  deleteIncourseByCourse: (courseId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}?course_id=${courseId}`,
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
  },

  deleteIncourseByStudent: (studentId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}?student_id=${studentId}`,
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