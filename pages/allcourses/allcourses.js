// pages/mycourse/mycourse.js
import store from '../../store/store.js'
import create from '../../utils/create'

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    course_array: [{
        course_img_url: "/static/img/default_course_img.jpeg",
      course_name: "课程名1",
        teacher: "教师1",
        school: "中山大学"
      }, {
        course_img_url: "/static/img/default_course_img.jpeg",
        course_name: "课程名2",
        teacher: "教师2",
        school: "中山大学"
      }, {
        course_img_url: "/static/img/default_course_img.jpeg",
        course_name: "课程名3",
        teacher: "教师3",
        school: "中山大学"
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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