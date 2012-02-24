(function(){
    this.MILLI_SECONDS_IN_ONE_DAY = 1000 * 3600 * 24;
    var dateUtil = {};
    dateUtil.isInSameWeek = function(entryDate, endDateOfWeek) {
        var realEndDate = new Date(endDateOfWeek);
        realEndDate = new Date(new Date(new Date(realEndDate).toDateString()).getTime() + MILLI_SECONDS_IN_ONE_DAY);
        var logDate = new Date(entryDate);
        return (realEndDate >= logDate) && ((realEndDate.getTime() - logDate.getTime()) <= 7 * MILLI_SECONDS_IN_ONE_DAY);
    };
    dateUtil.getNumberOfDay = function(date) {
        var dayNumberOfDate = new Date(date).getDay();
        return !dayNumberOfDate ? 7 : dayNumberOfDate;
    };
    dateUtil.getYearOfDay = function(date) {
        return new Date(date).getYear();
    };

    this["dateUtil"] = dateUtil;
})();