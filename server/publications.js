Meteor.publish('favoriteCounts', function() {
  return FavoriteCounts.find();
});

Meteor.publish('news', function() {
  return News.find({}, {sort: {date: -1}, limit: 1});
});

Meteor.publish('latestActivity', function () {
  return Activities.latest();
});

Meteor.publish('feed', function() {
  return Activities.find({}, {sort: {date: -1}, limit: 10});
});

Meteor.publish('post', function(name) {
  check(name, String);
  return [
    FavoriteCounts.find({postName: name}),
    Activities.find({postName: name})
  ];
});

// autopublish the user's favorites and admin status
Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {
    fields: {
      admin: 1,
      favoritedPostNames: 1,
      'services.twitter.profile_image_url_https': 1
    }
  });
})