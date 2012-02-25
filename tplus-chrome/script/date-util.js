(function(){
    this.MILLI_SECONDS_IN_ONE_DAY = 1000 * 3600 * 24;
    var dateUtil = {};

    function getSundayOf(date){
        var obj = new Date(date);
        var day = obj.getDay();
        if(!!day){
            obj = new Date(obj.getTime() + (7-day)*MILLI_SECONDS_IN_ONE_DAY);
        }
        return new Date(new Date(new Date(obj).toDateString()).getTime() + MILLI_SECONDS_IN_ONE_DAY)
    }

    dateUtil.isInSameWeek = function(first, second) {
        var firstDate = new Date(first);
        var sunday = getSundayOf(second);
        return (firstDate <= sunday) && ((sunday.getTime() - firstDate.getTime()) <= 7 * MILLI_SECONDS_IN_ONE_DAY);
    };

    dateUtil.getNumberOfDay = function(date) {
        var dayNumberOfDate = new Date(date).getDay();
        return !dayNumberOfDate ? 7 : dayNumberOfDate;
    };

    dateUtil.getYearOfDay = function(date) {
        return new Date(date).getFullYear();
    };

    this["dateUtil"] = dateUtil;
})();