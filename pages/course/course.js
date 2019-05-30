// pages/course/course.js
import store from '../../store/store.js'
import create from '../../utils/create'
import api_homework from '../../api/homework.js'
import api_user from '../../api/user.js'
import api_charge_course from '../../api/charge_course.js'

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
    creator_info: null,
    ta_names: null,
    ta_emails: null,
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

    homework: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    if (this.store.data.curCourse){
      this.setData({
        curCourse: this.store.data.curCourse
      })
      console.log(this.data.curCourse)
      var creatorid = this.data.curCourse.creator_id
      var courseid = this.data.curCourse.course_id
      var creator_info = null;
      var ta_info = null;
      var ta_names = null;
      var ta_emails = null;
      var getTainfoPromises = []
      api_user.getUserById(creatorid).then(res => {
        console.log(res)
        creator_info = res.data.data
        this.setData({
          creator_info: creator_info
        })
      }, err => {
        console.log(err)
        console.log("获取创建者信息失败")
      })
      
      
      api_charge_course.getByCourseId(courseid).then(res => {
        console.log(res)
        res.data.data.forEach(chgcourse => {
        getTainfoPromises.push(api_user.getUserById(chgcourse.ta_id))
      })

        return this.store.doManyPromises(getTainfoPromises)

      }, err => {
        console.log(err)
        console.log("获取助教信息失败")
      }).then(res => {
        console.log(res)
        res.forEach(result =>{
          ta_info = result.data.data
          if(ta_names){
            ta_names = ta_names + "; " + ta_info.name
          } else {
            ta_names = ta_info.name
          }

          if(ta_emails){
            ta_emails = ta_emails + "; " + ta_info.email
          } else {
            ta_emails = ta_info.email
          }
        })
        console.log(ta_names)
        this.setData({
          ta_names: ta_names,
          ta_emails: ta_emails
        })
      }, err => {
        console.log(err)
        console.log("获取助教信息失败")
      })

      
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
    var windowWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      sliderLeft: (windowWidth / this.data.tabs.length - windowWidth / 4) / 2,
      sliderOffset: windowWidth / this.data.tabs.length * this.data.activeIndex
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

    //进入作业
    if (this.data.activeIndex == 2) {
      var that = this
      api_homework.getHomework(store.data.curCourse).then(function(res){

        console.log("获取作业列表")
        console.log(res)
        let homework = []
        for(let i=0;i<res.data.data.length;i++)
        {
          homework.push({
            title: res.data.data[i].title,
            content: res.data.data[i].content,
            ddl: res.data.data[i].deadline
          })
        }
        that.setData({
          homework: homework
        })
      })
    }
  },

  previewFile: function() {
    
  },

  chooseFile: function(){
    wx.getSavedFileList({
      success: function (res) {
        console.log(res.fileList)
      }
    })
  },

  addHomework: function() {
    console.log("添加作业")
    wx.navigateTo({
      url: '../addHomework/addHomework',
    })
  }
})