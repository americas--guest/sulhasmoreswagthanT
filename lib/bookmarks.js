FavoriteCounts = new Meteor.Collection('favoriteCounts');

Meteor.methods({
  'favoritePost': function(postName) {
    check(this.userId, String);
    check(postName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      favoritedPostNames: {$ne: postName}
    }, {
      $addToSet: {favoritedPostNames: postName}
    });

    if (affected)
      FavoriteCounts.update({postName: postName}, {$inc: {count: 1}});
  },

  'unfavoritePost': function(postName) {
    check(this.userId, String);
    check(postName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      favoritedPostNames: postName
    }, {
      $pull: {favoritedPostNames: postName}
    });

    if (affected)
      FavoriteCounts.update({postName: postName}, {$inc: {count: -1}});
  }
});

// Initialize favorite counts. We could use upsert instead.
if (Meteor.isServer && FavoriteCounts.find().count() === 0) {
  Meteor.startup(function() {
    _.each(BlogData, function(post, postName) {
      FavoriteCounts.insert({postName: postName, count: 0});
    });
  });
}