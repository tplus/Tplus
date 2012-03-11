function LogMessageParser() {
    //this.logDescriptionPattern = /^\[(.*)\]\s*(#r{0,1}\d+)*/;
    this.logUserNamesPattern = /^\[(.*)\]/;
    this.cardNumberOfCheckin = /#r{0,1}\d+/;
}

LogMessageParser.prototype = {
    parse: function(names, endDateOfWeek, data) {
        var self = this;
        var result = [];
        $(data).find(".bigtable tr").each(function(i, v) {
            var logDate = $(v).find('.date').text();
            var description = $(v).find('.description a').text();
            if (dateUtil.isInSameWeek(logDate, endDateOfWeek) && self._isCheckedInBy(description, names)) {
                result.push({
                    'dayOfWeek' : dateUtil.getNumberOfDay(logDate),
                    "cardNumberOfCheckin": self._extractStoryOrDefectOrTaskNumber(description)
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
        var result = description.toLowerCase().match(this.cardNumberOfCheckin);
        if(!!result){
            return result[0];
        }
        return "";
    }

}



