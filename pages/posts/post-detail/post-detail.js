// pages/post/post-detail/post-detal.js
var postsData = require('../../../data/posts-data.js')
var app = getApp();//app.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var postData = postsData.postList[postId];
    this.data.currentPostId = postId;//做中间变量，下面的方法将用到postId
    this.setData({
      postData: postData
    })
    // wx.setStorageSync('key','aa')
    // wx.setStorageSync('key', {
    //   game: 'bbb',
    //   developer: 'ccc'
    // })
    //设置本地localstorage存储收藏状态
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected){
      var postsCollected = postsCollected[postId]
      this.setData({
        collected: postsCollected
      }) 
    }else{
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor: function(){
    //全局监听音乐播放
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })   
      // 设置全局变量（控制音乐播放）为真
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
    //监听音乐停止
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
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
  //异步方法
  getPostsCollectedAsy: function(){
    var that = this;
    //异步与同步方法名区别是是否加sync
    wx.getStorage({
      key: "posts_collected",
      success: function(res){
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        postCollected = !postCollected
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected)
      }
    })
  },
  //同步
  getPostsCollectedSyc: function(){
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected)
  },
  onCollectionTap: function(event){
    this.getPostsCollectedSyc();
    // this.getPostsCollectedAsy();
  },
  showToast: function(postsCollected, postCollected){
    wx.setStorageSync('posts_collected', postsCollected)
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    //微信提供的组件
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功"
    })
  },
  //底部弹出分享
  onShareTap: function(event){
    var itemList = ["分享给微信好友", "分享到朋友圈", "分享到QQ", "分享到微博"]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res){
        wx.showModal({
          title: "用户"+itemList[res.tapIndex],
          content:"用户是否取消？"+res.cancel+"现在无法实现分享功能"
        })
      }
    })
  },
  //音乐的播放与暂停
  onMusicTap: function(event){
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.title,
        coverImgUrl: postData.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})