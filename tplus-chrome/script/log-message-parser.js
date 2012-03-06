function LogMessageParser() {
    //this.logDescriptionPattern = /^\[(.*)\]\s*(#r{0,1}\d+)*/;
    this.logUserNamesPattern = /^\[(.*)\]/;
    this.cardNumberOfCheckin = /#r{0,1}\d+/;
}

LogMessageParser.prototype = {
    parse: function(name, endDateOfWeek, data) {
        var self = this;
        var result = [];
        $(data).find(".bigtable tr").each(function(i, v) {
            var logDate = $(v).find('.date').text();
            var description = $(v).find('.description a').text();
            if (dateUtil.isInSameWeek(logDate, endDateOfWeek) && self._isCheckedInBy(description, name)) {
                result.push({
                    'dayOfWeek' : dateUtil.getNumberOfDay(logDate),
                    "cardNumberOfCheckin": self._extractStoryOrDefectOrTaskNumber(description)
                });
            }
        });
        return result;
    },
    _isCheckedInBy: function(description, name){
        var result = description.toLowerCase().match(this.logUserNamesPattern);
        if(!!result){
            var users = result[1].split("&");
            return users.indexOf(name.toLowerCase()) != -1;
        }
        return false;
    },
    _extractStoryOrDefectOrTaskNumber: function(description){
        var result = description.toLowerCase().match(this.cardNumberOfCheckin);
        if(!!result){
            return result[0];
        }
        return ""
    }

}



