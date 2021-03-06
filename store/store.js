export default {
  data: {
    //server: 'http://172.18.33.192:8123',
    server: 'http://182.254.206.244:8090',
    apiBase: '',
    motto: 'Hello World',
    openId: null,
    token: null,
    userInfo: null,
    profile: null,
    hasUserInfo: false,
    hasProfile: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logs: [],
    firstName: 'dnt',
    lastName: 'zhang',
    fullName: function () {
      return this.firstName + this.lastName
    },
    sessionId: null,
    data: {
      token: null,
      openId: null
    },
    pureProp: 'pureProp',
    globalPropTest: 'abc', //更改我会刷新所有页面,不需要在组件和页面声明data依赖
    ccc: { ddd: 1 }, //更改我会刷新所有页面,不需要在组件和页面声明data依赖
    curCourse: 1,
    userType: 0
  },
  globalData: ['globalPropTest', 'ccc.ddd'],
  logMotto: function () {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true

  //自定义全局可调用函数，执行一组异步操作
  doManyPromises: (promises) => {
    return new Promise((resolve, reject) => {
      Promise.all(promises).then(results => {
        resolve(results)
      }).catch(e => {
        reject(e)
      })
    })
  }
}