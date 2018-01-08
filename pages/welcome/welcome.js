Page({
  onTap: function(){
    console.log('onTap')
    wx.navigateTo({
      url: "../posts/post"
    })
  }
})