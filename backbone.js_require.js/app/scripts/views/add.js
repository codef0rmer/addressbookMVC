define([
  'jquery',
  'underscore',
  'backbone',
  'models/contact',
  'text!views/templates/add.html'
], function ($, _, backbone, contactModel, addTemplate) {

  var addView = Backbone.View.extend({
    el: 'div.span9',

    template: _.template(addTemplate),

    events: {
      'click .btn-primary': 'saveContact'
    },

    initialize: function () {
      _.bindAll(this);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    saveContact: function (e) {
      var full_name     = $('#full_name').val(),
          email         = $('#email').val(),
          phone         = $('#phone').val(),
          address       = $('#address').val(),
          id            = $('#id').val(),
          contactmodel  = null;

      if (id === '') {
        contactmodel = new contactModel({
          full_name : full_name,
          email     : email,
          phone     : phone,
          address   : address
        });
      } else {
        contactmodel = new contactModel({
          id        : id,
          full_name : full_name,
          email     : email,
          phone     : phone,
          address   : address
        });
      }
      contactmodel.save();
      return false;
    }
  });

  return addView;
});