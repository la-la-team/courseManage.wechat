// pages/course/course.js
import store from '../../store/store.js'
import create from '../../utils/create'

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    curCourse: null,
    activeIndex: 0,
    tabs: ['简介', '课件', '作业', '点名'],
    curUserHasJoined: false,
    sliderOffset: 0,
    sliderLeft: 0,

    files: [{
      filetype_img: "/static/img/pdf_icon.png",
      file_name: "文件1"
    }, {
        filetype_img: "/static/img/pdf_icon.png",
        file_name: "文件2"
    }, {
        filetype_img: "/static/img/pdf_icon.png",
        file_name: "文件3"
    }],

    homework: [{
      title: "作业一",
      content: "完成书本第一章课后练习",
      ddl: "2019.5.31 23:59"
    },{
        title: "作业二",
        content: "完成书本第二章课后练习",
        ddl: "2019.6.1 23:59"
    },{
        title: "作业三",
        content: "完成书本第三章课后练习",
        ddl: "2019.7.25 23:59"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.store.data.curCourse){
      this.setData({
        curCourse: this.store.data.curCourse
      });
    }
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
    this.setData({
      sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
      sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
    });
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

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  previewFile: function() {
    
  },

  chooseFile: function(){
    wx.getSavedFileList({
      success: function (res) {
        console.log(res.fileList)
      }
    })
  }
})