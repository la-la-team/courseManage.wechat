// pages/newCourse/newCourse.js
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
    descLength: 0
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
  }

})