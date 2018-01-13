class Movie {
  constructor(url) {
    this.url = url;
  }
  getMovieData(cb) {
    this.cb = cb;
    util.http(this.url, this.processDoubanData.bind(this));
  }
  processDoubanData(data) {
    if (!data) return
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }
    //将数据返回回去，相当于return，但此处用return是不起作用的
    //此处的this并不是上面的this.所以需要在上面用bing绑定一下
    this.cb(move)
  }
}

export {Movie}