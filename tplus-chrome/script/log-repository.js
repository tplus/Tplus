function LogRepository() {
    this.DEFAULT_REPOSITORY_URL = 'http://10.18.5.147:1911/shortlog/tip?revcount=1000';
}

LogRepository.prototype = {
    findBy: function(url, criteria, onSuccess){
        var self = this;
        jQuery.get(url || self.DEFAULT_REPOSITORY_URL, function(data) {
            var logs = self._extractLogEntries(criteria.initials, criteria.endDate);
            onSuccess(logs);
        });
    },
    _extractLogEntries: function(name, endDateOfWeek) {
        var self = this;
        var result = [];
        $(this.data).find(".bigtable tr").each(function(i, v) {
            var logDate = $(v).find('.date').text();
            var description = $(v).find('.description a').text();
            if (dateUtil.isInSameWeek(logDate, endDateOfWeek) && self._isCheckedInBy(description, name)) {
                result.push({
                    'dayOfWeek' : dateUtil.getNumberOfDay(logDate),
                    'comment': self._extractComment(description)
                });
            }
        });
        return result;
    },
    _isCheckedInBy: function(description, name) {
        var result = description.match(/\[(\w+\d*)&{0,1}(\w*\d*)\]/i);
        return !!result && (result[1].toLowerCase() == name.toLowerCase() || result[2].toLowerCase() == name.toLowerCase());
    },
    _extractComment: function(description){
        var matchResult = description.match(/#r{0,1}\d+/i);
        if (!!matchResult) {
            return matchResult[0];
        }
        return "";
    }
}




