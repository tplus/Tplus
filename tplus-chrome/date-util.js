(function(){
    this.MILLI_SECONDS_IN_ONE_DAY = 1000 * 3600 * 24;
    var dateUtil = {};
    dateUtil.isInSameWeek = function(currentDate, endDateOfWeek) {
        var realEndDate = new Date(endDateOfWeek);
        realEndDate = new Date(new Date(new Date(realEndDate).toDateString()).getTime() + 3600 * 1000 * 24);
        var logDate = new Date(currentDate);
        return (realEndDate >= logDate) && ((realEndDate.getTime() - logDate.getTime()) <= 7 * MILLI_SECONDS_IN_ONE_DAY);
    };
    dateUtil.getNumberOfDay = function(date) {
        var dayNumberOfDate = new Date(date).getDay();
        return !dayNumberOfDate ? 7 : dayNumberOfDate;
    };

    this["dateUtil"] = dateUtil;
})();