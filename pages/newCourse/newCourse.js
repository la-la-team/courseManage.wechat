// pages/newCourse/newCourse.js
import store from '../../store/store.js'
import create from '../../utils/create'
import api_course from '../../api/course.js'
import api_charge_course from '../../api/charge_course.js'

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    TA_ids: [],
    newTaId: null,
    tempFilePaths: null ,
    courseName: null,
    courseDesc: null,
    haveChoseImg: false,
    descLength: 0,
    curUserId: null,
    newCourseid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openid = wx.getStorageSync('openid')
    console.log("openid " + openid)
    this.setData({
      curUserId: openid
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

  chooseimage: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        _this.setData({
          tempFilePaths: res.tempFilePaths[0],
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
    var arr = this.data.TA_ids;
    arr.push(this.data.newTaId)
    this.setData({
      hiddenmodalput: true,
      TA_ids: arr
    });

    console.log(this.data.TA_ids)
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

  inputTa: function(e) {
    this.setData({
      newTaId: e.detail.value
    })
  },

  submit: function () {
    const image = this.data.tempFilePaths;
    const name = this.data.courseName;
    const content = this.data.courseDesc;
    //const _TAs = this.data.TA_ids;

    if (name && content) {
      wx.showLoading({
        title: '正在提交',
        mask: true
      })
      var newcourse = {
        name: name,
        content: content,
        creator_id: wx.getStorageSync("openid"),
        img_path: ""
      }
      api_course.postCourse(newcourse).then(res => {
        console.log(res)
        this.setData({
          newCourseid: res.data.id
        })
        return api_course.postCourseHead(res.data.id, image)
      }, err => {
        // TODO:处理此处的显示
        wx.hideLoading()
        wx.showToast({
          title: '创建失败',
          icon: 'none'
        })
      }).then(res => {
        console.log(res)
        var postTas = []
        this.data.TA_ids.forEach(taId => {
          var chargecourse = {
            course_id: this.data.newCourseid,
            ta_id: taId
          }
          console.log(taId)
          postTas.push(api_charge_course.postChargeCourse(chargecourse))
        })
        return this.store.doManyPromises(postTas)
      }, err => {
        // TODO:处理此处的显示
        wx.hideLoading()
        wx.showToast({
          title: '创建失败',
          icon: 'none'
        })
      })
      .then(res => {
        console.log(res)
        wx.hideLoading()
        
        wx.navigateBack({
          delta: 1,
          success: function() {
            wx.showToast({
              title: "创建成功",
              icon: 'none'
            })
          }
        })
      }, err => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: err.data.msg,
          icon: 'none'
        })
      })

      
    }
    
  }

})