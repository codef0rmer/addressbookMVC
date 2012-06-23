/* Author:
*  Addressbook in Backbone.js
*  codef0rmer <amit.2006.it@gmail.com>
*  http://amitgharat.wordpress.com/2012/06/23/writing-your-first-application-using-backbone-js/
*/
var AB = {
    run: function () {
        this.addview = new this.addView();
        this.listview = new this.listView();
        this.searchview = new this.searchView();
        this.contactscollection = new AB.contactsCollection();
        this.router = new this.Router();
        Backbone.history.start();
        this.router.navigate('add_new_contact', {trigger: true});		
    }
};

AB.Router = Backbone.Router.extend({
    routes: {
        'list_contacts': 	'renderListContactsPage', 
        'add_new_contact': 	'renderAddNewContactPage', 
        'search_contacts': 	'renderSearchContactsPage', 
        'edit_contact/:id': 'renderEditContactPage'		
    }, 

    renderAddNewContactPage: function () {
        AB.addview.addContactPage();
    }, 

    renderListContactsPage: function () {
        AB.listview.setElement('div.abPanel');
        AB.listview.listContactsPage();
    }, 

    renderSearchContactsPage: function () {
        AB.searchview.searchContactsPage();
    }, 

    renderEditContactPage: function (id) {
        AB.addview.addContactPage(id);
    }
});

AB.contactModel = Backbone.Model.extend({
    sync: function (method, model, options) {
        if (method === 'create' || method === 'update') {
            return $.ajax({
                dataType: 'json',
                url: '../php/addNewContact.php', 
                data: {
                    id: (this.get('id') || ''), 
                    full_name: (this.get('full_name') || ''), 
                    email: (this.get('email') || ''),
                    phone: (this.get('phone') || ''), 
                    address: (this.get('address') || '')
                }, 
                success: function (data) {					
                    $('span.false').html('');
                    if (data.success === true) {
                        if (method === 'update') {
                            AB.router.navigate('list_contacts', {trigger: true});
                        } else {
                            $('form').get(0).reset();
                        }
                    } else {
                        $.each(data.validationError, function () {
                            $('span.' + this.target).html(this.error);
                        });
                    }
                    $('span.success').html(data.msg).removeClass('false').addClass(data.success.toString());
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

AB.contactsCollection = Backbone.Collection.extend({
    model: AB.contactModel, 	
    url: '../php/listContacts.php'
});

/* addNewContact View */
AB.addView = Backbone.View.extend({
    el: 'div.abPanel', 

    template: _.template($('#addContactTemplate').html()), 

    events: {
        'submit form#frmAddContact': 'addContact'
    }, 

    initialize: function () {
        _.bindAll(this, 'addContactPage', 'addContact');
    }, 

    addContactPage: function (id) {
        var contact = {},
        model = AB.contactscollection.get(id);

        if (id !== undefined && model !== undefined) {
            contact = model.toJSON();
        }
        this.$el.html(this.template({contact: contact}));
    },

    addContact: function (event) {
        var full_name = $('#full_name').val(), 
            email = $('#email').val(), 
            phone = $('#phone').val(), 
            address = $('#address').val(), 
            id = $('#id').val();

        if (id === '') {
            var contactmodel = new AB.contactModel({
                full_name: full_name, 
                email: email, 
                phone: phone, 
                address: address
            });
        } else {
            var contactmodel = new AB.contactModel({
                id: id, 
                full_name: full_name, 
                email: email, 
                phone: phone, 
                address: address
            });	
        }
        contactmodel.save();
        return false;
    }
});

/* listContacts View */
AB.listView = Backbone.View.extend({
    el: 'div.abPanel', 

    template: _.template($('#listContactsTemplate').html()), 

    initialize: function () {
        _.bindAll(this, 'listContactsPage', 'render');
    }, 

    render: function (response) {
        var self = this;

        this.$el.html(this.template({contacts: response}));
        $('#contactsGrid tr[data-id]').each(function () {
            var id = $(this).attr('data-id');			
            $(this).find('a:first').click(function () {
                self.editContact(id);
            });
            $(this).find('a:last').click(function () {
                self.deleteContact(id);
            });
        });
    }, 

    listContactsPage: function (querystring) {
        var self = this;

        AB.contactscollection.fetch({
            data: querystring, 
            success: function (collection, response) {
                self.render(response);
            }
        });
    }, 

    deleteContact: function (id) {
        if (confirm('Are you sure to delete?')) {
            AB.contactscollection.get(id).destroy();
        }		
    }, 

    editContact: function (id) {
        AB.router.navigate('edit_contact/' + id, {trigger: true});
    }
});

/* searchContacts View */
AB.searchView = Backbone.View.extend({
    el: 'div.abPanel', 

    template: _.template($('#searchContactsTemplate').html()), 

    events: {
        'submit form#frmSearchContacts': 'searchContacts'
    },

    initialize: function () {
        _.bindAll(this, 'searchContactsPage', 'searchContacts');
    }, 

    searchContactsPage: function () {
        this.$el.html(this.template);
        AB.listview.setElement('#grid');
        AB.listview.render({});
    }, 

    searchContacts: function (event) {
        var full_name = $('#full_name').val(),
            email = $('#email').val();

        AB.listview.setElement('#grid');
        AB.listview.listContactsPage({full_name: full_name, email: email});
        return false;
    }
});

$(function () {
    AB.run();
});
