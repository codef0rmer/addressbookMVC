define([
  'jquery',
  'backbone'
], function ($, Backbone) {
    
  var contactModel = Backbone.Model.extend({
    sync: function (method, model, options) {
      if (method === 'create' || method === 'update') {
        return $.ajax({
          dataType: 'json',
          url: '../../php/addNewContact.php',
          data: {
            id: (this.get('id') || ''),
            full_name: (this.get('full_name') || ''),
            email: (this.get('email') || ''),
            phone: (this.get('phone') || ''),
            address: (this.get('address') || '')
          },
          success: function (data) {
            $('span').html('').hide();

            if (data.success === true) {
              $('form').get(0).reset();
            } else {
              $.each(data.validationError, function () {
                $('span.' + this.target).html(this.error).show();
              });
            }
            $('span.success').html(data.msg).addClass(data.success.toString()).show();
          }
        });
      } else if (method === 'delete') {
          var id = this.get('id');
          return $.getJSON('../php/deleteContact.php', { id: id }, function (data) {
              if (data.success === true) {
                  $('#contactsGrid tr[data-id="' + id + '"]').hide('slow');
              } else {
                  alert(data.msg);
              }
          });
      }
    }
  });

  return contactModel;
});