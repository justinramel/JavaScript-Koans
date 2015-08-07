var SAMURAIPRINCIPLE = {
  Deferred: function() {
    var _funcs = [], _args, _failed, _rejectArgs;

    this.done = function(func) {
      _funcs.push(func);

      if (_args) {
        func.apply(undefined, _args);
      }

      return this;
    };

    this.resolve = function() {
      _args = Array.prototype.slice.call(arguments);

      for(var func in _funcs) {
        _funcs[func].apply(undefined, _args);
      }

      return this;
    };

    this.failed = function(failed) {
      if (_rejectArgs) {
        failed.apply(undefined, _rejectArgs);
      }

      _failed = failed;
      return this;
    };

    this.reject = function() {
      _rejectArgs = Array.prototype.slice.call(arguments);
      if (_failed) {
        _failed.apply(undefined, _rejectArgs);
      }
      return this;
    };

    this.then = function(done, failed) {
      this.done(done);
      this.failed(failed);
      return this;
    };

  }
};

SAMURAIPRINCIPLE.Deferred.when = function() {
  var i, toResolve = arguments.length;
  var deferred = new SAMURAIPRINCIPLE.Deferred();
  for (i = 0; i < arguments.length ; i++) {
    arguments[i].then(
      function () {
        toResolve--;
        if (!toResolve) {
          deferred.resolve();
        }
      },
      deferred.reject
    );
  }
  return deferred;
};
