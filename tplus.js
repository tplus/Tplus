(function() {
    function search(name, startDate) {
        var data = [
            {dayOfWeek: 1, comment: '#1, #11'},
            {dayOfWeek: 2, comment: '#2'},
            {dayOfWeek: 3, comment: '#3'},
            {dayOfWeek: 4, comment: '#4'},
            {dayOfWeek: 5, comment: '#5'},
            {dayOfWeek: 6, comment: '#6'},
            {dayOfWeek: 7, comment: '#7'}
        ];
        return data;
    }

    function render(data, startDate, endDate) {
        $('.time-sheet .start-date').text(startDate.toDateString());
        $('.time-sheet .end-date').text(endDate.toDateString());

        var tableContent = '';
        for (var i in data) {
            var entry = data[i];
            tableContent += '<tr><td class="day-of-week">' + entry.dayOfWeek + '</td><td class="comment">' + entry.comment + '</td></tr>';
        }
        $('tbody').html(tableContent);
    }

    var dayOfWeek = Date.today().getDay(),
        startDate = Date.today().addDays(1 - dayOfWeek),
        endDate = Date.today().addDays(7 - dayOfWeek);

    $(function() {
        $('.search').click(function() {
            var name = $('.name input').val(),
                data = search(name, startDate);
            render(data, startDate, endDate);
        });
    });

})();