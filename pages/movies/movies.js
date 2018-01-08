var app = getApp();//默认取app.js
Page({
  onLoad: function(event){
    var inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters";
    var comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon";
    var top250Url = app.globalData.doubanBase +"/v2/movie/top250";
    this.getMovieListData(inTheatersUrl);
    this.getMovieListData(comingSoonUrl);
    this.getMovieListData(top250Url);
  },
  getMovieListData: function(url){
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        "Content-Type": "application/xml"//此处为不豆瓣的bug，正常应为application/json
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {

      }
    })
  }
})
