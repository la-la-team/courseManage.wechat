// pages/course/course.js
import store from '../../store/store.js'
import create from '../../utils/create'
import api_homework from '../../api/homework.js'
import api_roll from '../../api/roll.js'
import api_user from '../../api/user.js'
import api_charge_course from '../../api/charge_course.js'
import api_in_course from '../../api/in_course.js'
import api_ppt_file from '../../api/ppt_file.js'
import api_in_roll from '../../api/in_roll.js'
import util from '../../utils/util.js' 

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userType: null,
    curCourse: null,
    activeIndex: 0,
    tabs: ['简介', '课件', '作业', '点名'],
    curUserHasJoined: false,
    curUserIsCreator: false,
    sliderOffset: 0,
    sliderLeft: 0,
    creator_info: null,
    ta_names: null,
    ta_emails: null,
    pdf_img: "/static/img/pdf_icon.png",
    files: [],

    homework: [],

    roll: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("course.js onLoad")
    if (this.store.data.curCourse){
      this.setData({
        curCourse: this.store.data.curCourse
      })
      console.log(this.data.curCourse)
      var creatorid = this.data.curCourse.creator_id

      //if i am creator, show course_key
      this.setData({
        curUserIsCreator: creatorid == wx.getStorageSync("openid")
      })

      var courseid = this.data.curCourse.course_id

      //if i have joined, do not show join button
      api_in_course.getByCourseIdAndStuId(this.data.curCourse.course_id, wx.getStorageSync("openid")).then(res => {
        if (res.data.data.length != 0){
          this.setData({
            curUserHasJoined: true
          })
        }
      }, err => {
        console.log(err)
      })


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
        this.setData({
          ta_names: ta_names,
          ta_emails: ta_emails
        })
      }, err => {
        console.log(err)
        console.log("获取助教信息失败")
      })

      
    }

    this.setData({
      userType: store.data.userType
    })
    console.log("user type:" + this.data.userType)
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
    var that = this
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    //进入作业
    if (this.data.activeIndex == 2) {
      
      console.log(store.data.curCourse)
      api_homework.getHomework(store.data.curCourse.course_id).then(function(res){

        console.log("获取作业列表")
        console.log(res)
        let homework = []
        for(let i=0;i<res.data.data.length;i++)
        {
          homework.push({
            title: res.data.data[i].title,
            content: res.data.data[i].content,
            ddl: res.data.data[i].deadline,
            id: res.data.data[i].id
          })
        }
        that.setData({
          homework: homework
        })
      })
    } else if (this.data.activeIndex == 1){
      //获取所有ppt
      api_ppt_file.getPPTListByCourseid(1).then(res => {
        console.log(res)
        var ppts = []
        res.data.data.forEach(result => {
          var temp = {
            id: result.id,
            name: result.name,
            creator_id: result.creator_id
          }

          ppts.push(temp)
        })

        this.setData({
          files: ppts
        })
      }, err => {
        console.log(err)
      })
    }
    else if (this.data.activeIndex == 3)  //进入点名
    {
      console.log(store.data.curCourse.course_id)
      api_roll.getRollByCourseId(store.data.curCourse.course_id).then(function (res) {

        console.log("获取签到列表")
        console.log(res)
        let roll = []
        for (let i = 0; i < res.data.data.length; i++) {
          roll.push({
            title: res.data.data[i].title,
            begin_time: res.data.data[i].begin_time.substring(0,16),
            end_time: res.data.data[i].end_time.substring(0, 16),
            id: res.data.data[i].id
          })
        }
        that.setData({
          roll: roll
        })
      })
    }
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
  },

  addRoll: function() {
    console.log("发起签到")
    wx.navigateTo({
      url: '../addRoll/addRoll',
    })
  },

  deleteHomework: function(e) {
    console.log("删除作业")
    console.log(e.currentTarget.dataset.item.id)
    api_homework.deleteHomework(e.currentTarget.dataset.item.id).then(function(res) {
      console.log(res)
    })
  },

  joinCourse: function(e) {
    //console.log(e.currentTarget.dataset.item.id)
    var incourse = {
      course_id: this.data.curCourse.course_id,
      student_id: wx.getStorageSync("openid"),
      course_key: "",
    }
    api_in_course.postIncourse(incourse).then(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  },

  previewFile: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.item.id;
    var name = e.currentTarget.dataset.item.name;
    
    api_ppt_file.getPPTById(id)
    .then(res => {
      wx.showToast({
        title: '下载成功',
      })
      const filePath = res.tempFilePath
      console.log(filePath)
      wx.openDocument({
        filePath: filePath,
        fileType: name.split('.')[1],
        success: function (res) {
          console.log('打开文档成功')
        },
        fail: function(e) {
          console.log(e)
        }
      })
    })

  },

  rollIn: function (e) {
    console.log("签到")
    let inroll = {
      roll_id: e.currentTarget.dataset.item.id,
      student_id: wx.getStorageSync("openid"),
      time: util.formatTime(new Date())+":00"
    }
    console.log(inroll)
    api_in_roll.postInroll(inroll).then(function(res) {
      console.log("签到成功！")
      console.log(res)
    })
  }
})