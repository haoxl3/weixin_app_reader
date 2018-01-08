var postsData = require('../../data/posts-data.js')

Page({
  data: {

  },
  onLoad: function(){
    this.setData({
      posts_key: postsData.postList
    });
    // 
    // this.data.posts_key = postsData.postList
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },
  //点击轮播图后的跳转
  onSwiperTap: function(event){
    //target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  }
})