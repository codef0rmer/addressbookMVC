define([
  'jquery',
  'underscore',
  'backbone',
  'views/list',
  'text!views/templates/search.html'
], function ($, _, backbone, listView, searchTemplate) {
  
  var searchView = Backbone.View.extend({
    el: 'div.span9',

    events: {
      'click .btn-primary': 'searchContacts'
    },

    template: _.template(searchTemplate),

    initialize: function () {
      _.bindAll(this);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    searchContacts: function () {
      var full_name = $('#full_name').val(),
          email = $('#email').val();

      var listview = new listView();
      listview.setElement('#grid');
      listview.render({full_name: full_name, email: email});
      return false;
    }
  });

  return searchView;
});