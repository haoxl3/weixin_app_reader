Page({
  onTap: function(){
    console.log('onTap')
    wx.switchTab({
      url: "../posts/post"
    })
  }
})