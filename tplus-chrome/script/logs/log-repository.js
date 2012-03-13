function LogRepository() {
    this.DEFAULT_HG_WEB_API_PATH = "/shortlog/tip?revcount=500"
}

LogRepository.prototype = {
    load: function(url, onSuccess){
        var self = this;
        url = "http://"+ url.concat(self.DEFAULT_HG_WEB_API_PATH);
        jQuery.get(url, function(rawLogs) {
            var logs = self.parse(rawLogs);
            onSuccess(logs);
        });
    },
    parse: function(rawLogs){
        var result = [];
        $(rawLogs).find(".bigtable tr").each(function(i, v) {
            var logDate = $(v).find('.date').text();
            var description = $(v).find('.description a').text();
                result.push({
                    'date' : logDate,
                    "description": description
                });
        });
        return result;

    }
}




