function TplusFinder() {
    this.daysOfWeek = ['1','2','3','4','5','6','7'];
    this.fakeEndDateOfWeek = Date.parse('2012-01-22 00:00 +0800');
}

TplusFinder.prototype = {
    search: function(name, endDateOfWeek) {
        var changeSets = new LogRepository().findBy(name, this.fakeEndDateOfWeek);
        return this._transformChangeSets(changeSets);
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


