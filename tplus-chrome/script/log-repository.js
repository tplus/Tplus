function LogRepository() {
    this.TIGER_ACTIVITY_CODE = 'PWC0001 TIGER MISC';
}

LogRepository.prototype = {
    findBy: function(url, criteria, onSuccess){
        var self = this;
        jQuery.get(url, function(data) {
            var logs = self._extractLogEntries(criteria.userName, criteria.endDate);
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
                    'date' : logDate,
                    'description': description
                });
            }
        });
        return result;
    },
    _isCheckedInBy: function(description, name) {
        var result = description.match(/\[(\w+\d*)&{0,1}(\w*\d*)\]/i);
        return !!result && (result[1].toLowerCase() == name.toLowerCase() || result[2].toLowerCase() == name.toLowerCase());
    }
}




