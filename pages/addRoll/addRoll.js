// pages/addRoll/addRoll.js
import util from '../../utils/util.js' 
import api_roll from '../../api/roll.js'
import store from '../../store/store.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    begin_date: null,
    begin_time: null,
    end_date: null,
    end_time:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date()
    let TIME = util.formatTime(date)
    this.setData({
      begin_date: TIME.substring(0,10),
      begin_time: TIME.substring(11,16),
      end_date: TIME.substring(0, 10),
      end_time: TIME.substring(11, 16)
    })
    console.log("default begin and end date:"+this.data.begin_date)
    console.log("default begin and end time:"+this.data.begin_time)
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

  bindBeginDateChange: function(e) {
    console.log("set begin date:" + e.detail.value)
    this.setData({
      begin_date: e.detail.value
    })
  },

  bindBeginTimeChange: function (e) {
    console.log("set begin time:" + e.detail.value)
    this.setData({
      begin_time: e.detail.value
    })
  },

  bindEndDateChange: function (e) {
    console.log("set end date:" + e.detail.value)
    this.setData({
      end_date: e.detail.value
    })
  },

  bindEndTimeChange: function (e) {
    console.log("set end time:" + e.detail.value)
    this.setData({
      end_time: e.detail.value
    })
  },

  addRoll: function () {
    var that = this
    if (this.data.title) {
      api_roll.postRoll({
        course_id: store.data.curCourse.course_id,
        title: this.data.title,
        begin_time: this.data.begin_date+" "+this.data.begin_time+":00",
        end_time: this.data.end_date + " " + this.data.end_time+":00"
      }).then(function (res) {
        console.log(res)
        let pages = getCurrentPages();
        let prePage = pages[pages.length - 2]; //上一个页面
        let roll = prePage.data.roll
        roll.push({
          title: that.data.title,
          begin_time: that.data.begin_date+" "+that.data.begin_time,
          end_time: that.data.end_date+" "+that.data.end_time,
          id: res.data.id
        })
        prePage.setData({
          roll: roll
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