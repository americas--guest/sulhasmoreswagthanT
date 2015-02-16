Template.favorites.helpers({
  postCount: function() {
    return pluralize(this.length, 'post');
  }
});