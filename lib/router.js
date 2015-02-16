var feedSubscription;

// Handle for launch screen possibly dismissed from app-body.js
dataReadyHold = null;

// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('news');
  Meteor.subscribe('favoriteCounts');
  feedSubscription = Meteor.subscribe('feed');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

HomeController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('latestActivity', function() {
      dataReadyHold.release();
    });
  }
});

FeedController = RouteController.extend({
  onBeforeAction: function() {
    this.feedSubscription = feedSubscription;
  }
});

BlogController = RouteController.extend({
  data: function() {
    return _.values(BlogData);
  }
});

FavoritesController = RouteController.extend({
  onBeforeAction: function() {
    if (Meteor.user())
      Meteor.subscribe('favorites');
    else
      Overlay.open('authOverlay');
  },
  data: function() {
    if (Meteor.user())
      return _.values(_.pick(BlogData, Meteor.user().favoritedPostNames));
  }
});

PostController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('post', this.params.name);
  },
  data: function() {
    return BlogData[this.params.name];
  }
});

AdminController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('news');
  }
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('feed');
  this.route('blog');
  this.route('favorites');
  this.route('about');
  this.route('post', {path: '/blog/:name'});
  this.route('admin2', { layoutTemplate: null });
});

Router.onBeforeAction('dataNotFound', {only: 'post'});