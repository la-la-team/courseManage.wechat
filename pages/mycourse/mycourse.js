// pages/mycourse/mycourse.js
import store from '../../store/store.js'
import create from '../../utils/create'
import api_course from '../../api/course.js'
import api_in_course from '../../api/in_course.js'
import api_user from '../../api/user.js'

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    curUserId: null,
    course_array: null,
    imgPaths: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = wx.getStorageSync("openid")
    this.setData({
      curUserId: userid,
      userType: options.type
    })

    wx.showLoading({
      title: '正在获取课程列表',
      mask: true
    })

    var courses = []
    var courseHeads = []

    /* 判断用户类型
    //学生
    if(this.data.userType == 0){

      // userid 获取 courseid, then 获取 course data
      api_in_course.getByStudentId(userid).then(res => {
        var promises = []
        res.data.data.forEach(result => {
          console.log(result)
          promises.push(api_course.getCourseById(result.course_id))
        })

        return this.store.doManyPromises(promises)
      }, err => {
        console.log(err)
      })
      .then(res => {
          console.log(res)
          var len = res.data.data.length
          if (len == 0) {
            wx.hideLoading()
            return
          }
          var getid_promises = []

          //获取课程基本信息
          res.data.data.forEach(function (_course) {
            getid_promises.push(api_user.getUserById(_course.creator_id))

            var item = {
              course_img_url: "/static/img/default_course_img.jpeg",
              course_name: _course.name,
              content: _course.content,
              creator_id: _course.creator_id,
              course_id: _course.id,
              course_key: _course.course_key
            }
            courses.push(item)

          })

          return this.store.doManyPromises(getid_promises)
        }, err => {
          wx.showToast({
            title: '获取课程列表失败',
            icon: 'none'
          })
        })
        .then(res => {
          if (!res) return
          console.log(res)
          res.forEach(result => {
            var _cid = result.data.data.id
            courses.forEach(item => {
              if (item.creator_id == _cid) {
                item.teacher = result.data.data.name
                item.school = result.data.data.school
              }
            })
          })

          this.setData({
            course_array: courses
          })

          wx.hideLoading()

        }, err => {
          console.log(err)
        })

      // userid 获取 courseid, then 获取 course head
      api_in_course.getByStudentId(userid).then(res => {
        var len = res.data.data.length
        if (len == 0) {
          wx.hideLoading()
          return
        }

        var gethead_promises = []

        //获取课程基本信息
        res.data.data.forEach(function (_course) {
          gethead_promises.push(api_course.getCourseHeadById(_course.id))
        })

        return this.store.doManyPromises(gethead_promises)
      }, err => {
        console.log(err)
      })
        .then(res => {
          if (!res) return
          console.log(res)
          var img_paths = []
          res.forEach(result => {
            img_paths.push(result.tempFilePath)
          })
          this.setData({
            imgPaths: img_paths
          })
        }, err => {
          console.log(err)
        })
    }  */
    

    //获取课程信息 then 获取creator信息
    api_course.getCourseById(userid).then(res => {
      console.log(res)
      var len = res.data.data.length
      if (len == 0) {
        wx.hideLoading()
        return
      }
      var getid_promises = []

      //获取课程基本信息
      res.data.data.forEach(function (_course) {
        getid_promises.push(api_user.getUserById(_course.creator_id))

        var item = {
          course_img_url: "/static/img/default_course_img.jpeg",
          course_name: _course.name,
          content: _course.content,
          creator_id: _course.creator_id,
          course_id: _course.id,
          course_key: _course.course_key
        }
        courses.push(item)

      })

      return this.store.doManyPromises(getid_promises)
    }, err => {
      wx.showToast({
        title: '获取课程列表失败',
        icon: 'none'
      })
    })
      .then(res => {
        if (!res) return
        console.log(res)
        res.forEach(result => {
          var _cid = result.data.data.id
          courses.forEach(item => {
            if (item.creator_id == _cid) {
              item.teacher = result.data.data.name
              item.school = result.data.data.school
            }
          })
        })

        this.setData({
          course_array: courses
        })

        wx.hideLoading()

      }, err => {
        console.log(err)
      })


    //获取课程信息 then 获取head信息
    api_course.getCourseById(userid).then(res => {
      var len = res.data.data.length
      if (len == 0) {
        wx.hideLoading()
        return
      }

      var gethead_promises = []

      //获取课程基本信息
      res.data.data.forEach(function (_course) {
        gethead_promises.push(api_course.getCourseHeadById(_course.id))
      })

      return this.store.doManyPromises(gethead_promises)
    }, err => {
      console.log(err)
    })
      .then(res => {
        if (!res) return
        console.log(res)
        var img_paths = []
        res.forEach(result => {
          img_paths.push(result.tempFilePath)
        })
        this.setData({
          imgPaths: img_paths
        })
      }, err => {
        console.log(err)
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  show_course_detail: function (e) {
    this.store.data.curCourse = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/course/course'
    });
  }
})