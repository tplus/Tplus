function LogRepository(data) {
    this.daysOfWeek = ['1','2','3','4','5','6','7'];
    this.data = data;
}

LogRepository.prototype = {
    search: function(name, endDateOfWeek) {
        var changeSets = this._filterBy(name, endDateOfWeek);
        return this._transformChangeSets(changeSets);
    },
    _getLogEntries: function(s) {
        var result = [];
        $(s).find(".bigtable tr").each(function(i, v) {
            result.push({
                'date' : $(v).find('.age').text(),
                'description': $(v).find('.description a').text()
            })
        });
        return result.slice(1);
    },
    _filterBy: function(name, endDateOfWeek) {
        return _.filter(this._getLogEntries(this.data), function(changeSet) {
            var changeSetDate = Date.parse(changeSet.date);
            var startDateOfWeek = endDateOfWeek.clone().addDays(-6);
            return changeSetDate.between(startDateOfWeek, endDateOfWeek) && changeSet.description.indexOf(name) != -1;
        });
    },
    _transformChangeSets: function(changeSets) {
        var me = this;
        return _.map(this.daysOfWeek, function(dayOfWeek) {
            var changeSetsOfDay = _.filter(changeSets, function(changeSet) {
                var changeSetDate = Date.parse(changeSet.date);
                var dayOfChangeSet = Date.getDayNumberFromName(changeSetDate.getDayName());
                return dayOfChangeSet == dayOfWeek;
            });
            var commentsOfDay = _.uniq(_.map(changeSetsOfDay, function(changeSet) {
                return me._transformComments(changeSet.description)
            }));
            return  {'dayOfWeek': dayOfWeek, 'comment': commentsOfDay.join(',')};
        });
    },
    _transformComments: function(description) {
        //todo: merge N/A
        return description.split(" ")[1];
    }

}




