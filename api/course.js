import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/course'

export default {
  getAllCourse: () => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}`,
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

  getCourseById: (creatorId) => {
    let param = creatorId ? { id: creatorId } : {}
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}/creator_id`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        data: param,
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

  postCourse: (courseInfo) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}/method=data`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        data: courseInfo,
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

  postCourseHead: (id, head)=>{
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `http://182.254.206.244:8090/course?method=head&id=${id}`,
        filePath: `${head}`,
        name: 'file',
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

  putCourse: (id, courseInfo) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'PUT',
        url: `${apiBase}/method=data&id=${id}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        data: courseInfo,
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

  putCourseHead: (id, head) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'PUT',
        url: `${apiBase}/method=head&id=${id}`,
        header: {
          //'Authorization': `Bearer ${store.data.token}`
        },
        data: head,
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

  deleteCourse: (id) => {
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