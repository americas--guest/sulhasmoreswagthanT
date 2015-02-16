var TAB_KEY = 'postShowTab';

Template.post.created = function() {
  if (Router.current().params.activityId)
    Template.post.setTab('feed');
  else
    Template.post.setTab('post');
}

Template.post.rendered = function () {
  this.$('.post').touchwipe({
    wipeDown: function () {
      if (Session.equals(TAB_KEY, 'post'))
        Template.post.setTab('make')
    },
    preventDefaultEvents: false
  });
  this.$('.attribution-post').touchwipe({
    wipeUp: function () {
      if (! Session.equals(TAB_KEY, 'post'))
        Template.post.setTab('post')
    },
    preventDefaultEvents: false
  });
}

// CSS transitions can't tell the difference between e.g. reaching
//   the "make" tab from the expanded state or the "feed" tab
//   so we need to help the transition out by attaching another
//   class that indicates if the feed tab should slide out of the
//   way smoothly, right away, or after the transition is over
Template.post.setTab = function(tab) {
  var lastTab = Session.get(TAB_KEY);
  Session.set(TAB_KEY, tab);
  
  var fromPost = (lastTab === 'post') && (tab !== 'post');
  $('.feed-scrollable').toggleClass('instant', fromPost);

  var toPost = (lastTab !== 'post') && (tab === 'post');
  $('.feed-scrollable').toggleClass('delayed', toPost);
}

Template.post.helpers({
  isActiveTab: function(name) {
    return Session.equals(TAB_KEY, name);
  },
  activeTabClass: function() {
    return Session.get(TAB_KEY);
  },
  favorited: function() {
    return Meteor.user() && _.include(Meteor.user().favoritedPostNames, this.name);
  },
  activities: function() {
    return Activities.find({postName: this.name}, {sort: {date: -1}});
  }
});

Template.post.events({
  'click .js-add-favorite': function(event) {
    event.preventDefault();

    if (! Meteor.userId())
      return Overlay.open('authOverlay');
    
    Meteor.call('favoritePost', this.name);
  },

  'click .js-remove-favorite': function(event) {
    event.preventDefault();

    Meteor.call('unfavoritePost', this.name);
  },
  
  'click .js-show-post': function(event) {
    event.stopPropagation();
    Template.post.setTab('make')
  },
  
  'click .js-show-feed': function(event) {
    event.stopPropagation();
    Template.post.setTab('feed')
  },
  
  'click .js-uncollapse': function() {
    Template.post.setTab('post')
  },

  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});