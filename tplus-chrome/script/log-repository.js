function LogRepository() {
    this.DEFAULT_HG_WEB_API_PATH = "/shortlog/tip?revcount=500"
    this.parser = new LogMessageParser();
}

LogRepository.prototype = {
    findBy: function(url, userName, endDate, onSuccess){
        var self = this;
        url = "http://"+ url.concat(self.DEFAULT_HG_WEB_API_PATH);
        jQuery.get(url, function(logsInHtmlFormat) {
            var logs = self.parser.parse(userName, endDate, logsInHtmlFormat);
            onSuccess(logs);
        });
    }
}




