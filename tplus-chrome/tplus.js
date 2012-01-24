(function () {
    var BREATHE_DELAY = 200,
        MESSAGE_DELAY = 5000,
        LOADING_MESSAGE = 'TPlus is retrieving data, please wait...',
        READY_MESSAGE = 'Log from SCM system is prepared ready for you.',
        DEFAULT_ACTIVITY_CODE = 'PWC0001 TIGER MISC',
        DEFAULT_DAILY_WORKING_HOURS = 8,
        MILLI_SECONDS_IN_ONE_DAY = 1000 * 3600 * 24,
        MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        SEARCH_API_URL = 'http://223.4.116.15/fake_search.json';

    function noOp() {
    }

    function beforeSearch() {
        $('body').append('<div class="tplus_header"><div class="tplus_msg"><img src="data:image/gif;base64,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%3D"/>' + LOADING_MESSAGE + '</div></div>')
    }

    function afterSearch() {
        $('.tplus_msg').text(READY_MESSAGE);
        setTimeout(function () {
            $('.tplus_header').hide();
        }, MESSAGE_DELAY);
    }

    function fillTimeReport(timeRecords, currentIndex) {
        currentIndex = currentIndex || 0;
        if (currentIndex === timeRecords.length) return;
        if (getExistingTimeRecordRowCount() <= currentIndex) {
            addNewRowInTableAndThen(function () {
                fillTimeRecordAndContinue(timeRecords, currentIndex);
            });
        }
        else {
            fillTimeRecordAndContinue(timeRecords, currentIndex);
        }
    }

    function getExistingTimeRecordRowCount() {
        var existingTimeRecordCountSelector = 'table:eq(1) tr';
        return $(existingTimeRecordCountSelector).length - 2;
    }

    function addNewRowInTableAndThen(callbackFn) {
        var timeRecordRowCount = getExistingTimeRecordRowCount(),
            addRowLinkSelector = '#add_row a',
            addRowLink = $(addRowLinkSelector);
        addRowLink.click();
        waitUntilNewRowPresentAndThen(timeRecordRowCount + 1, callbackFn);
    }

    function waitUntilNewRowPresentAndThen(expectedNumOfRows, callbackFn) {
        if (getExistingTimeRecordRowCount() == expectedNumOfRows) {
            (callbackFn || noOp)();
        }
        else {
            setTimeout(function () {
                waitUntilNewRowPresentAndThen(expectedNumOfRows, callbackFn)
            }, BREATHE_DELAY)
        }
    }

    function fillTimeRecordAndContinue(timeRecords, currentIndex) {
        setTimeRecordFields(timeRecords, currentIndex);
        fillTimeReport(timeRecords, currentIndex + 1);
    }

    function setEndDate(endDateString) {
        var endDateTextBoxSelector = '#week_ending_date_string',
            endDateTextBox = $(endDateTextBoxSelector);
        endDateTextBox.val(endDateString);
    }

    function setExpenseStatus(hasExpense) {
        var expenseRadioButtonSelector = '#time_sheet_expenses_' + hasExpense;
        $(expenseRadioButtonSelector).click();
    }

    function setTimeRecordFields(timeRecords, rowIndex) {
        setActivity(rowIndex, DEFAULT_ACTIVITY_CODE);
        setBillableStatus(rowIndex, true);
        setComment(rowIndex, timeRecords[rowIndex].comment);
        setWorkingHours(rowIndex, timeRecords[rowIndex].dayOfWeek, DEFAULT_DAILY_WORKING_HOURS);
    }

    function setActivity(rowIndex, activity) {
        var activityTextBoxSelector = 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(2) input';
        $(activityTextBoxSelector).val(activity);
    }

    function setBillableStatus(rowIndex, billable) {
        var billableRadioButtonSelector = billable
            ? 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(4) input:eq(0)'
            : 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(4) input:eq(1)';
        $(billableRadioButtonSelector).click();
    }

    function setComment(rowIndex, comment) {
        var commentTextBoxSelector = 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(5) input';
        $(commentTextBoxSelector).val(comment);
    }

    function setWorkingHours(rowIndex, workingDay, workingHours) {
        var getDayOfWeekTextBox = function(rowIndex, dayOfWeek) {
            var dayOfWeekTextBoxSelector = 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(' + (5 + dayOfWeek) + ') input';
            return $(dayOfWeekTextBoxSelector);
        };
        for (var day = 1; day <= 7; day++) {
            day == workingDay
                ? getDayOfWeekTextBox(rowIndex, day).val(workingHours)
                : getDayOfWeekTextBox(rowIndex, day).val('');
        }
    }

    function formatDateToString(date) {
        var dateStr = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            monthStr = MONTH_NAMES[date.getMonth()],
            yearStr = date.getFullYear();
        return dateStr + ' ' + monthStr + ' ' + yearStr;
    }

    $(function () {
        var nameSelector = '#login_status .login',
            namePattern = /^Logged in as: ([^\s|]*) | Logout/,
            nameMatch = $(nameSelector).text().match(namePattern),
            name = nameMatch && nameMatch[1] ? nameMatch[1] : null,
            today = new Date(),
            dayOfWeek = today.getDay() == 0 ? 7 : today.getDay(),
            endDate = dayOfWeek == 1
                ? new Date(today.getTime() - MILLI_SECONDS_IN_ONE_DAY)
                : new Date(today.getTime() + (7 - dayOfWeek) * MILLI_SECONDS_IN_ONE_DAY),
            endDateString = formatDateToString(endDate);

        beforeSearch();
        $.getJSON(SEARCH_API_URL, {"name":name, "endDate":endDateString}, function (data) {
            console.log(data);
            afterSearch();
            setEndDate(endDateString);
            setExpenseStatus(false);
            fillTimeReport(data);
        });

    });
})();
