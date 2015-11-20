(function() {
  System.config({
    defaultJSExtensions: true,
    map: { json: '/config/loaders/json.js' },
  });

  System.import('/conf.json!').then(function(config) {
    System.config(config);
    return System.import('/app');
  });
})();
