// pages/modifyPersonalInfo/modifyPersonalInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schools: ["中山大学", "华南理工大学", "华南师范大学"],
    schoolIndex: 0,
    types: ["学生", "老师",],
    typeIndex: 0,
    name: null,
    number: null,
    email: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: res => {
        console.log("获取用户信息")
        console.log(res)
        this.setData({
          name: res.userInfo.nickName
        })
      }
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

  bindSchoolChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  },

  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },

  register: function () {
    var that = this
    if(!this.data.number || !this.data.email)
    {
      return
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://182.254.206.244:8090/user',
            data: {
              name: that.data.name,
              number: parseInt(that.data.number),
              token: res.code,
              email: that.data.email,
              school: that.data.schools[that.data.schoolIndex],
              type: that.data.typeIndex
            },
            method: 'POST',
            success: res => {
              console.log("注册成功！")
              console.log(res)
              wx.setStorageSync('openid', res.data.id)
              wx.request({
                url: `http://182.254.206.244:8090/user/${res.data.id}`,
                data: {
                  method: 'id',
                },
                success: res => {
                  console.log("登录成功！")
                  console.log(res)
                  wx.switchTab({
                    url: '../allcourses/allcourses'
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  bindInput: function (e) {
    let inputName = e.currentTarget.dataset.inputname;
    this.setData({
      [inputName]: e.detail.value
    })
  }
})