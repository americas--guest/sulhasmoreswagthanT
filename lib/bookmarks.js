FavoriteCounts = new Meteor.Collection('favoriteCounts');

Meteor.methods({
  'favoriteRecipe': function(recipeName) {
    check(this.userId, String);
    check(recipeName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      favoritedRecipeNames: {$ne: recipeName}
    }, {
      $addToSet: {favoritedRecipeNames: recipeName}
    });

    if (affected)
      FavoriteCounts.update({recipeName: recipeName}, {$inc: {count: 1}});
  },

  'unfavoriteRecipe': function(recipeName) {
    check(this.userId, String);
    check(recipeName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      favoritedRecipeNames: recipeName
    }, {
      $pull: {favoritedRecipeNames: recipeName}
    });

    if (affected)
      FavoriteCounts.update({recipeName: recipeName}, {$inc: {count: -1}});
  }
});

// Initialize favorite counts. We could use upsert instead.
if (Meteor.isServer && FavoriteCounts.find().count() === 0) {
  Meteor.startup(function() {
    _.each(RecipesData, function(recipe, recipeName) {
      FavoriteCounts.insert({recipeName: recipeName, count: 0});
    });
  });
}