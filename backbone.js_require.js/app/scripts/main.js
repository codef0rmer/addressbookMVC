require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },

  // Mention locations of scripts we use
  paths: {
    backbone: 'vendor/backbone/backbone',
    jquery: 'vendor/jquery/jquery',
    underscore: 'vendor/underscore/underscore',
    text: 'vendor/requirejs/text'
  }
});
 
require(['routers/router'], function(Router) {
  var router = new Router();
  Backbone.history.start();
});