// pages/newCourse/newCourse.js
import store from '../../store/store.js'
import create from '../../utils/create'
import api_course from '../../api/course.js'
import api_charge_course from '../../api/charge_course.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    TA_ids: ["11223344", "22334455"],
    _TA_id_arr: null,
    newTaId: "学号",
    tempFilePaths: '' ,
    courseName: null,
    courseDesc: null,
    haveChoseImg: false,
    descLength: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _TA_id_arr: TA_ids
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

  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: 'compressed',
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths,
          haveChoseImg: true
        })
      }
    })
  },

  addTa: function() {
    this.setData({
      hiddenmodalput: false
    });
  },

  confirm: function () {
    this.setData({
      hiddenmodalput: true,
      TA_ids: this.data.TA_ids.concat(this.data.newTaId)
    });
  } ,

  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },

  inputName: function(e){
    this.setData({
      courseName: e.detail.value
    })
  },

  inputDesc: function(e){
    this.setData({
      courseDesc: e.detail.value,
      descLength: e.detail.value.length
    })
  },

  submit: function () {
    const image = this.data.tempFilePaths;
    const name = this.data.courseName;
    const content = this.data.courseDesc;
    //const _TAs = this.data.TA_ids;
    var newCourseid;

    if (name && content) {
      wx.showLoading({
        title: '正在创建...',
        mask: true
      })
      newcourse = {
        name: name,
        content: content,
        creator_id: app.data.openId,
        img_path: image
      }
      api_course.postCourse(newcourse).then(res => {
        console.log(res)
        if (res.status == "success") {
          newCourseid = res.data[0].id
          return api_course.putCourseHead(newCourseid, image)
        } else {
          console.log("创建课程失败...")
          console.log(res.msg);
        }
      }, err => {
        console.log(err)
      })
      .then(res => {
        if (res.status == "success") {
          for (var taId in this.data.TA_ids){
            var chargecourse = {
              course_id: newCourseid,
              ta_id: taId
            }
            // api_charge_course.post(chargecourse).then(res => {
              
            // }, err => {

            // })
          }
          
        } else {
          console.log("创建课程失败...")
          console.log(res.msg);
        }
      }, err => {
        // TODO:处理此处的显示
        wx.hideLoading()
        wx.showToast({
          title: '创建失败',
          icon: 'none'
        })
      })

      
    }
    
  }

})