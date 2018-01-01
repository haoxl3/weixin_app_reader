Page({
  data: {
    date: "Sep 18 2016",
    title: "正是虾肥蟹壮时3",
    posts_key: []
  },
  imgPath: "/images/...",
  process: function(){
    var date = "Nov 18 2016";
    var date_ele = document.getElementById('id');
  },
  onLoad: function(options){
    // 页面初始化options为页面跳转所带来的参数
    var posts_content = [
      {
        date: "Sep 18 2016",
        title: "正是虾蟹肥壮时",
        post_img: "/images/post/crab.png",
        content: "文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容",
        view_num: "112",
        collect_num: "96",
        author_img: "/images/avatar/1.png"
      },
      {
        date: "Sep 18 2016",
        title: "正是虾蟹肥壮时",
        post_img: "/images/post/crab.png",
        content: "文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容",
        view_num: "112",
        collect_num: "96",
        author_img: "/images/avatar/1.png"
      }
    ]
    this.setData({
      posts_key: posts_content
    });
  },
  onReady: function(){
    //页面渲染完成
    console.log('onready')
  }
})