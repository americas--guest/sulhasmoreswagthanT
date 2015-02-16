Template.recipeItem.helpers({
  path: function () {
    return Router.path('recipe', this.recipe);
  },
  
  highlightedClass: function () {
    if (this.size === 'large')
      return 'highlighted';
  },
  
  favoriteCount: function () {
    var count = FavoriteCounts.findOne({recipeName: this.name});
    return count && count.count;
  }
});