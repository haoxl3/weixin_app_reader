var app = getApp();//默认取app.js
var util = require('../../utils/util.js')
Page({
  data: {
    inTheatersUrl:{},
    comingSoonUrl: {},
    top250Url: {},
    searchResult: {},
    containerShow: true,
    searchPannelShow: false
  },
  onLoad: function(event){
    var inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters";
    var comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon";
    var top250Url = app.globalData.doubanBase +"/v2/movie/top250";
    this.getMovieListData(inTheatersUrl,'inTheatersUrl',"正在热映");
    this.getMovieListData(comingSoonUrl,'comingSoonUrl',"即将上映");
    this.getMovieListData(top250Url,'top250Url',"豆瓣top250");
  },
  getMovieListData: function (url, settedKey, catetoryTitle){
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        "Content-Type": "application/xml"//此处为不豆瓣的bug，正常应为application/json
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, catetoryTitle)
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {

      }
    })
  },
  processDoubanData: function (moviesDouban, settedKey, catetoryTitle){
    var movies = [];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = { 
      catetoryTitle:catetoryTitle,
      movies: movies
    };
    this.setData(readyData);
  },
  //跳到更多电影
  onMoreTap: function(event){
    let category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },
  //搜索框获取焦点时
  onBindFocus:function(event){
    this.setData({
      containerShow: false,
      searchPannelShow: true
    })
  },
  //搜索框内容改变时发送请求,也可以用bindblur事件
  onBindConfirm: function(event){
    var text = event.detail.value;//获取文本框值
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult","");
  },
  //点击搜索框上的删除按钮
  onCancelImgTap: function(event){
    this.setData({
      containerShow: true,
      searchPannelShow: false,
      searchResult: {}
    })
  }
})
