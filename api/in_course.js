import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/in_course'
const sessionId = wx.getStorageSync('sessionId')
export default {
  getByStudentId: (student_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?student_id=${student_id}`,
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
  getByCourseId: (course_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?course_id=${course_id}`,
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

  getByCourseIdAndStuId: (course_id, student_id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?course_id=${course_id}&student_id=${student_id}`,
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

  postIncourse: (incourse) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
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
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
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
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
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
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
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