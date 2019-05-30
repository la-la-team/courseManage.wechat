// pages/addHomework/addHomework.js
import api_homework from '../../api/homework.js'
import store from '../../store/store.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    content: null,
    ddl: null
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

  addHomework: function () {
    var that = this
    console.log("title:" + this.data.title + ";content:" + this.data.content + ";ddl:" + this.data.ddl)
    if (this.data.title && this.data.content && this.data.ddl)
    {
      api_homework.postHomework({
        course_id: store.data.curCourse.course_id,
        title: this.data.title,
        content: this.data.content,
        deadline: this.data.ddl
      }).then(function(res) {
        console.log(res)
        let pages = getCurrentPages();
        let prePage = pages[pages.length - 2]; //上一个页面
        let homework = prePage.data.homework
        homework.push({
          title: that.data.title,
          content: that.data.content,
          ddl: that.data.ddl
        })
        prePage.setData({
          homework: homework
        })
        wx.navigateBack({
          delta: 1
        })
      })
    }
  },

  bindInput: function (e) {
    let inputName = e.currentTarget.dataset.inputname;
    　this.setData({
      　　　[inputName]: e.detail.value
    　})
  }
})