var postsData = require('../../data/posts-data.js')

Page({
  data: {

  },
  onLoad: function(options){
    // 页面初始化options为页面跳转所带来的参数
    this.setData({
      posts_key: postsData.postList
    });
    // 
    // this.data.posts_key = postsData.postList
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail"
    })
  }
})