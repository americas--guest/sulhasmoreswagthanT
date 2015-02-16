Template.postItem.helpers({
  path: function () {
    return Router.path('post', this.post);
  },
  
  highlightedClass: function () {
    if (this.size === 'large')
      return 'highlighted';
  },
  
  favoriteCount: function () {
    var count = FavoriteCounts.findOne({postName: this.name});
    return count && count.count;
  }
});