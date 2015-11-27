(function() {
  System.config({
    defaultJSExtensions: true,
    map: { json: '/config/loaders/json.js' },
  });

  System.import('/src/conf.json!').then(function(config) {
    System.config(config);
    return System.import('/src/app/app');
  });
})();
