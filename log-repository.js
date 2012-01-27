function LogRepository() {
}

LogRepository.prototype = {
    all : function() {
        var fakeChangeSets = [
            {
                'date' : '2012-01-20 16:31 +0800',
                'description': '[WR&SW] #363 add logic of timezone in edit work record process'
            },
            {
                'date': '2012-01-19 17:52 +0800',
                'description' : '[LDD&SW] #363 add utc time and client time into cookie while login'
            }
        ];
        return fakeChangeSets
    },
    findBy: function(name, endDateOfWeek) {
        return _.filter(this.all(), function(changeSet) {
            var changeSetDate = Date.parse(changeSet.date);
            var startDateOfWeek = endDateOfWeek.clone().addDays(-6);
            return changeSetDate.between(startDateOfWeek, endDateOfWeek) && changeSet.description.indexOf(name) != -1;
        });
    }
}




