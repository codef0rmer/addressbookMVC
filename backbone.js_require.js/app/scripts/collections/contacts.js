define([
  'models/contact',
  'backbone'
], function (contactModel, Backbone) {
  
  var contactsCollection = Backbone.Collection.extend({
    model: contactModel,
    url: '../../php/listContacts.php'
  });

  return contactsCollection;
});