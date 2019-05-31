// pages/mycourse/mycourse.js
import store from '../../store/store.js'
import create from '../../utils/create'
import api_course from '../../api/course.js'
import api_user from '../../api/user.js'

const app = App()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    course_array: [],

    imgPaths: null

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在获取课程列表',
      mask: true
    })

    var courses = []
    var courseHeads = []

    //获取课程信息 then 获取creator信息
    api_course.getAllCourse().then(res => {
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
          course_key: _course.creator_id == wx.getStorageSync("openid") ? _course.course_key : ""
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
    api_course.getAllCourse().then(res => {
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
        var courses = []
        this.data.course_array.forEach((course, index) => {
          var temp = course
          temp.course_img_url = img_paths[index]
          courses.push(temp)
        })
        this.setData({
          course_array: courses
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
    wx.setNavigationBarTitle({
      title: '课程帮手'
    })
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var courses = []
    var courseHeads = []

    //获取课程信息 then 获取creator信息
    api_course.getAllCourse().then(res => {
      console.log(res)
      var len = res.data.data.length
      if (len == 0 || len == this.data.course_array.length) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '刷新成功',
        })
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
          course_key: _course.creator_id == wx.getStorageSync("openid") ? _course.course_key : ""
        }
        courses.push(item)

      })

      return this.store.doManyPromises(getid_promises)
    }, err => {
      wx.showToast({
        title: '刷新失败',
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

        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '刷新成功',
        })

      }, err => {
        console.log(err)
      })


    //获取课程信息 then 获取head信息
    api_course.getAllCourse().then(res => {
      var len = res.data.data.length
      if (len == 0 || len == this.data.course_array.length) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '刷新成功',
        })
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
        var courses = []
        this.data.course_array.forEach((course, index) => {
          var temp = course
          temp.course_img_url = img_paths[index]
          courses.push(temp)
        })
        this.setData({
          course_array: courses
        })

      }, err => {
        console.log(err)
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '刷新失败',
        })
      })
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

  show_course_detail:function (e) {
    this.store.data.curCourse = e.currentTarget.dataset.item;
    console.log(e)
    wx.navigateTo({
      url: '/pages/course/course'
    });
  }


})