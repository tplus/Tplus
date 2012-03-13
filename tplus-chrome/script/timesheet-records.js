function TimesheetRecords(logs, code) {
    this.logs = logs;
    this.code = code;
    //this.logDescriptionPattern = /^\[(.*)\]\s*(#r{0,1}\d+)*/;
    this.logUserNamesPattern = /^\[(.*)\]/;
    this.cardNumberOfCheckinPattern = /#r{0,1}\d+/;
}

TimesheetRecords.prototype = {
    filterBy: function(names, endDateOfWeek) {
        var self = this;
        var result = [];
       _.map(self.logs, function(log){
           var logDate = log.date;
           var description = log.description;
            if (dateUtil.isInSameWeek(logDate, endDateOfWeek) && self._isCheckedInBy(description, names)) {
                result.push({
                    'dayOfWeek' : dateUtil.getNumberOfDay(logDate),
                    "comment": self._extractStoryOrDefectOrTaskNumber(description),
                    'code': self.code,
                    'billable': true
                });
            }
        });
        return result;
    },
    _isCheckedInBy: function(description, names){
        if(typeof names === "string") {
            names = [names];
        }
        names = _.map(names, function(name){ return name.toLowerCase(); });
        var result = description.toLowerCase().match(this.logUserNamesPattern);
        if(!result || !result[1]) {
            return false;
        }
        var users = result[1].split("&");
        return _.intersection(users, names).length > 0;
    },
    _extractStoryOrDefectOrTaskNumber: function(description){
        var result = description.toLowerCase().match(this.cardNumberOfCheckinPattern);
        if(!!result){
            return result[0];
        }
        return ""
    }

}



