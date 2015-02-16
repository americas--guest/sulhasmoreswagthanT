Template.favorites.helpers({
  recipeCount: function() {
    return pluralize(this.length, 'recipe');
  }
});