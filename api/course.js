import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/course'


export default {
  getAllCourse: () => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?method=data`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
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

  getCourseHeadById: (courseid) => {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: `${apiBase}?method=head&id=${courseid}`, 
        success(res) {
          if (res.statusCode === 200) {
            // wx.playVoice({
            //   filePath: res.tempFilePath
            // })
          }
        }
      })
      
      wx.request({
        method: 'GET',
        url: `${apiBase}?method=head&id=${courseid}`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
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

  getCourseById: (creatorId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}?method=data&creator_id=${creatorId}`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
        },
        data: null,
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

  postCourse: (courseInfo) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}?method=data`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
        },
        
        data: courseInfo,
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

  postCourseHead: (course_id, head)=>{
    console.log("postCourseHead")
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${apiBase}?method=head&id=${course_id}`,
        filePath: head,
        name: 'file',
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
        },
        success: res => {
          console.log(res)
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

  putCourse: (id, courseInfo) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'PUT',
        url: `${apiBase}?method=data&id=${id}`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
        },
        data: courseInfo,
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

  putCourseHead: (id, head) => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `http://182.254.206.244:8090/course?method=head&id=${id}`,
        filePath: head,
        name: 'file',
        success: res => {
          console.log(res)
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

  deleteCourse: (id) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}?id=${id}`,
        header: {
          'content-type': 'application/json',
          'cookie': `gosessionid=${wx.getStorageSync('sessionId')}`
        },
        data: null,
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
  }
}