var FEATURED_COUNT = 4;

Template.home.helpers({
  // selects FEATURED_COUNT number of blog at random
  featuredBlog: function() {
    var blog = _.values(BlogData);
    var selection = [];
    
    for (var i = 0;i < FEATURED_COUNT;i++)
      selection.push(blog.splice(_.random(blog.length - 1), 1)[0]);

    return selection;
  },
  
  activities: function() {
    return Activities.latest();
  },
  
  latestNews: function() {
    return News.latest();
  },

  //Template.home.event({
 'selectedFont': function(){
     return "itaintrocketscience"
   // return "chalkdust"
     // return "harabarahand"
  // return "itaintrocketscience"
  // return  "shelterme"
  // return "wildscript"
   // return "windsong"
   },

   // }), for events

});




