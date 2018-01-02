// pages/post/post-detail/post-detal.js
var postsData = require('../../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  onCollectionTap: function(event){
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected)
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
  }
})