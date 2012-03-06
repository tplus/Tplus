function LogRepository() {
    this.DEFAULT_REPOSITORY_URL = 'http://10.18.5.147:1911/shortlog/tip?revcount=500';
    this.DEFAULT_HG_WEB_API_PATH = "/shortlog/tip?revcount=500"
    this.parser = new LogMessageParser();
}

LogRepository.prototype = {
    findBy: function(url, criteria, onSuccess){
        var self = this;
        url = !!url ? url.concat(self.DEFAULT_HG_WEB_API_PATH) : self.DEFAULT_REPOSITORY_URL;
        jQuery.get(url, function(logsInHtmlFormat) {
            var logs = self.parser.parse(criteria.initials, criteria.endDate, logsInHtmlFormat);
            onSuccess(logs);
        });
    }
}




