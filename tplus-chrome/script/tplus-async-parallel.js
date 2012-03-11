(function(){
    var root = this;
    var async = {};
    root.tplusAsync = async;
    async.parallel = function(asyncs, callback) {
        var result = [];
        var completed = 0;
        _.each(asyncs, function(async) {
            async.call(null, function(data) {
                result.push(data);
                completed++;
                if (completed == asyncs.length) {
                    callback(result);
                }
            });
        });
    }
})();