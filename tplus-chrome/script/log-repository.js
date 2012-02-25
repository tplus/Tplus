function LogRepository() {
    this.DEFAULT_REPOSITORY_URL = 'http://10.18.5.147:1911/shortlog/tip?revcount=1000';
    this.commentHelper = new LogMessageHelper();
}

LogRepository.prototype = {
    findBy: function(url, criteria, onSuccess){
        var self = this;
        jQuery.get(url || self.DEFAULT_REPOSITORY_URL, function(data) {
            var logs = self._extractLogEntries(criteria.initials, criteria.endDate, data);
            onSuccess(logs);
        });
    },
    _extractLogEntries: function(name, endDateOfWeek, data) {
        var self = this;
        var result = [];
        $(data).find(".bigtable tr").each(function(i, v) {
            var logDate = $(v).find('.date').text();
            var description = $(v).find('.description a').text();
            if (dateUtil.isInSameWeek(logDate, endDateOfWeek) && self.commentHelper.isCheckedInBy(description, name)) {
                result.push({
                    'dayOfWeek' : dateUtil.getNumberOfDay(logDate),
                    'comment': self.commentHelper.extractStoryOrDefectOrTaskNumber()
                });
            }
        });
        return result;
    }
}




