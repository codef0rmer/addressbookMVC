define(['views/add', 'views/list', 'views/search', 'backbone'], function (addView, listView, searchView, Backbone) {
  
  var Router = Backbone.Router.extend({
    lastView: null,

    routes: {
      ''        : 'addPage',
      'add'     : 'addPage',
      'list'    : 'listPage',
      'search'  : 'searchPage',
      'edit'    : 'editPage'
    },

    addPage: function () {
      this.payBack();
      this.lastView = new addView();
      this.lastView.render();
    },

    listPage: function () {
      this.payBack();
      this.lastView = new listView();
      this.lastView.render();
    },

    searchPage: function () {
      this.payBack();
      this.lastView = new searchView();
      this.lastView.render();
    },

    // Backbone does not undelegate events on its own especially when multiple
    // views loading into the same **el**
    payBack: function () {
      if (this.lastView !== null) {
        this.lastView.undelegateEvents();
      }

      $('ul.nav').children('li').removeClass('active').end()
        .find('li a[href="' + (window.location.hash || '#add') + '"]')
        .parent().addClass('active');
    }
  });

  return Router;
});
