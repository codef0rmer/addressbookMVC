define([
  'jquery',
  'underscore',
  'backbone',
  'collections/contacts',
  'text!views/templates/list.html'
], function ($, _, backbone, contactsCollection, listTemplate) {
  
  var listView = Backbone.View.extend({
    el: 'div.span9',

    template: _.template(listTemplate),

    initialize: function () {
      _.bindAll(this);
    },

    render: function (querystring) {
      var contacts = new contactsCollection();
      contacts.fetch({
        data: querystring,
        success: $.proxy(function (collection, response) {
          this.$el.html(this.template({contacts: response}));
        }, this)
      });

      return this;
    }
  });

  return listView;
});