// pages/mycourse/mycourse.js
import store from '../../store/store.js'
import create from '../../utils/create'
import api_course from '../../api/course.js'
import api_user from '../../api/user.js'

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    course_array: [{
        course_img_url: "/static/img/default_course_img.jpeg",
        course_name: "课程名1",
        content: "简介简介",
        teacher: "教师1",
        school: "中山大学"
      }, {
        course_img_url: "/static/img/default_course_img.jpeg",
        course_name: "课程名2",
        content: "简介简介",
        teacher: "教师2",
        school: "中山大学"
      }, {
        course_img_url: "/static/img/default_course_img.jpeg",
        course_name: "课程名3",
        content: "简介简介",
        teacher: "教师3",
        school: "中山大学"
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在获取课程列表',
      mask: true
    })
    api_course.getAllCourse().then(res => {
      console.log(res)
      if (res.data.status == "success"){

        // if (res.cookies[0]){
        //   var cookie = res.cookies[0];
        //   var session = cookie.split(';')[0];
        //   var sessionId = session.split('=')[1]
        //   wx.setStorageSync('sessionId', sessionId)
          
        // }

        var len = res.data.data.length
        if(len == 0) {
          wx.hideLoading()
          return 
        }
        var temp = []
        res.data.data.forEach(function(_course, index){
          var creator_data = api_user.getUserById(_course.creator_id).then(res => {
            if(res.data.status == "success"){
              return res.data.data
            }
          }, err => {
            wx.hideLoading()
            wx.showToast({
              title: '获取课程列表失败',
              icon: 'none'
            }) 
          })
          var item = {
            course_img_url: "/static/img/default_course_img.jpeg",
            course_name: _course.name,
            content: _course.content,
            teacher: _course.creator_id,
            school: creator_data.school
          }
          temp.push(item)
          if (index == len-1){
            wx.hideLoading()
          }
        })

        this.setData({
          course_array: temp
        })
      }
    }, err=>{
      wx.showToast({
        title: '获取课程列表失败',
        icon: 'none'
      })
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

  show_course_detail:function (e) {
    this.store.data.curCourse = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/course/course'
    });
  }


})