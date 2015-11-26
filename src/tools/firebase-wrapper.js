/* eslint no-multi-spaces:0 */
(function(root) {
  var Firebase = root.Firebase;
  var toArray = Function.prototype.call.bind(Array.prototype.slice);
  window.FirebasePromise = FirebasePromise;


  function DisconnectWrapper(disconnect) {
    this._ref = disconnect;
  }
  DisconnectWrapper.prototype.cancel = promiseWrap('cancel', 1);
  DisconnectWrapper.prototype.remove = promiseWrap('remove', 1);
  DisconnectWrapper.prototype.set = promiseWrap('set', 2);
  DisconnectWrapper.prototype.setWithPriority = promiseWrap('setWithPriority', 3);
  DisconnectWrapper.prototype.update = promiseWrap('update', 2);


  function FirebasePromise(value) {
    this._ref = value instanceof Firebase ? value : new Firebase(value);
  }
  // Static
  FirebasePromise._ref = Firebase;
  FirebasePromise.ServerValue = Firebase.ServerValue;
  FirebasePromise.SDK_VERSION = Firebase.SDK_VERSION;
  FirebasePromise.INTERNAL    = Firebase.INTERNAL;
  FirebasePromise.TEST_ACCESS = Firebase.TEST_ACCESS;
  FirebasePromise.Context     = Firebase.Context;
  FirebasePromise.goOffline     = simpleWrap('goOffline');
  FirebasePromise.goOnline      = simpleWrap('goOnline');
  FirebasePromise.enableLogging = simpleWrap('enableLogging');
  // No wrap
  FirebasePromise.prototype.name    = simpleWrap('name');
  FirebasePromise.prototype.key     = simpleWrap('key');
  FirebasePromise.prototype.getAuth = simpleWrap('getAuth');
  FirebasePromise.prototype.onAuth  = simpleWrap('onAuth');
  FirebasePromise.prototype.offAuth = simpleWrap('offAuth');
  // Constructor wrappers
  FirebasePromise.prototype.onDisconnect = constructorWrap('onDisconnect', DisconnectWrapper);
  FirebasePromise.prototype.child        = constructorWrap('child', FirebasePromise);
  FirebasePromise.prototype.parent       = constructorWrap('parent', FirebasePromise);
  FirebasePromise.prototype.root         = constructorWrap('root', FirebasePromise);
  // Promise wrappers
  FirebasePromise.prototype.authWithCustomToken   = promiseWrap('authWithCustomToken', 2);
  FirebasePromise.prototype.authWithOAuthPopup    = promiseWrap('authWithOAuthPopup', 2);
  FirebasePromise.prototype.authWithOAuthRedirect = promiseWrap('authWithOAuthRedirect', 2);
  FirebasePromise.prototype.authWithOAuthToken    = promiseWrap('authWithOAuthToken', 3);
  FirebasePromise.prototype.authAnonymously       = promiseWrap('authAnonymously', 1);
  FirebasePromise.prototype.authWithPassword      = promiseWrap('authWithPassword', 2);
  FirebasePromise.prototype.set             = promiseWrap('set', 2);
  FirebasePromise.prototype.update          = promiseWrap('update', 2);
  FirebasePromise.prototype.remove          = promiseWrap('remove', 1);
  FirebasePromise.prototype.setWithPriority = promiseWrap('setWithPriority', 3);
  FirebasePromise.prototype.setPriority     = promiseWrap('setPriority', 2);
  FirebasePromise.prototype.push            = promiseWrap('push', 2);
  FirebasePromise.prototype.auth            = promiseWrap('auth', 2);
  FirebasePromise.prototype.unauth          = promiseWrap('unauth', 1);
  FirebasePromise.prototype.createUser      = promiseWrap('createUser', 2);
  FirebasePromise.prototype.removeUser      = promiseWrap('removeUser', 2);
  FirebasePromise.prototype.changePassword  = promiseWrap('changePassword', 2);
  FirebasePromise.prototype.changeEmail     = promiseWrap('changeEmail', 2);
  FirebasePromise.prototype.resetPassword   = promiseWrap('resetPassword', 2);
  // Inherited from Query
  FirebasePromise.prototype.ref             = constructorWrap('ref', FirebasePromise);
  FirebasePromise.prototype.on              = simpleWrap('on');
  FirebasePromise.prototype.off             = simpleWrap('off');
  FirebasePromise.prototype.once            = simpleWrap('once');
  FirebasePromise.prototype.limit           = simpleWrap('limit');
  FirebasePromise.prototype.limitToFirst    = simpleWrap('limitToFirst');
  FirebasePromise.prototype.limitToLast     = simpleWrap('limitToLast');
  FirebasePromise.prototype.orderByChild    = simpleWrap('orderByChild');
  FirebasePromise.prototype.orderByKey      = simpleWrap('orderByKey');
  FirebasePromise.prototype.orderByPriority = simpleWrap('orderByPriority');
  FirebasePromise.prototype.orderByValue    = simpleWrap('orderByValue');
  FirebasePromise.prototype.startAt         = simpleWrap('startAt');
  FirebasePromise.prototype.endAt           = simpleWrap('endAt');
  FirebasePromise.prototype.equalTo         = simpleWrap('equalTo');
  FirebasePromise.prototype.toString        = simpleWrap('toString');
  // Special case
  FirebasePromise.prototype.transaction = function(transactionUpdate, applyLocally) {
    var ref = this._ref;
    return new Promise(function(resolve, reject) {
      ref.transaction(transactionUpdate, function(error, commited, snapshot) {
        if (error) reject(error);
        else resolve({ commited: commited, snapshot: snapshot });
      }, applyLocally);
    });
  };


  function simpleWrap(method) {
    return function() {
      return this._ref[method].apply(this._ref, arguments);
    };
  }

  function constructorWrap(method, Class) {
    return function() {
      return new Class(this._ref[method].apply(this._ref, arguments));
    };
  }

  function promiseWrap(method, callbackPosition) {
    return function() {
      var args = toArray(arguments);
      var ref = this._ref;
      var value;

      var promise = new Promise(function(resolve, reject) {
        args.splice(callbackPosition - 1, 0, function(error, value) {
          if (error) reject(error);
          else resolve(value);
        });

        value = ref[method].apply(ref, args);
      });

      promise.returned = value;
      return promise;
    };
  }
})(this);
