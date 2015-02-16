News = new Mongo.Collection('news');

News.allow({
  insert: function(userId) {
    var user = Meteor.users.findOne(userId);
    return user && user.admin;
  }
});

News.latest = function() {
  return News.findOne({}, {sort: {date: -1}, limit: 1});
}

if (Meteor.isServer && News.find().count() === 1) {
  Meteor.startup(function() {
    News.insert({
      text: 'Guys, check out my album that just dropped, "Hot Like Sugar"... Get it now on iTunes!',
      date: new Date
    });
  });
}