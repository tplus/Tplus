(function () {
    var BREATHE_DELAY = 200,
        DEFAULT_ACTIVITY_CODE = 'PWC0001 TIGER MISC',
        DEFAULT_DAILY_WORKING_HOURS = 8,
        MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        DEFAULT_REPOSITORY_URL = 'http://10.18.8.31:1911';

    function noOp() {
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
        $(activityTextBoxSelector).val(activity).change();
    }

    function setBillableStatus(rowIndex, billable) {
        var billableRadioButtonSelector = billable
            ? 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(4) input:eq(0)'
            : 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(4) input:eq(1)';
        $(billableRadioButtonSelector).click();
    }

    function setComment(rowIndex, comment) {
        var commentTextBoxSelector = 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(5) input';
        $(commentTextBoxSelector).val(comment).change();
    }

    function setWorkingHours(rowIndex, workingDay, workingHours) {
        var getDayOfWeekTextBox = function(rowIndex, dayOfWeek) {
            var dayOfWeekTextBoxSelector = 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(' + (5 + dayOfWeek) + ') input';
            return $(dayOfWeekTextBoxSelector);
        };
        for (var day = 1; day <= 7; day++) {
            day == workingDay
                ? getDayOfWeekTextBox(rowIndex, day).val(workingHours).change()
                : getDayOfWeekTextBox(rowIndex, day).val('').change();
        }
    }

    function formatToTEDateString(date) {
        var dateStr = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            monthStr = MONTH_NAMES[date.getMonth()],
            yearStr = date.getFullYear();
        return dateStr + ' ' + monthStr + ' ' + yearStr;
    }


    function searchAndFill(queryOption) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", queryOption.repositoryUrl || DEFAULT_REPOSITORY_URL, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var data = xhr.responseText;
                var logEntries = new LogRepository(data).search(queryOption.initials, queryOption.endDate);
                setEndDate(formatToTEDateString(new Date(queryOption.endDate)));
                setExpenseStatus(false);
                fillTimeReport(logEntries);
            }
        }
        xhr.send();
    }

    function onRequest(request) {
        if(!request || !request.initials || !request.endDate) return;
        searchAndFill(request);
    }

    $(function () {
        var fullNameSelector = '#content h1',
            fullNamePattern = /^Add Time Report for (.*)$/,
            fullNameMatch = $(fullNameSelector).text().match(fullNamePattern),
            fullName = fullNameMatch && fullNameMatch[1] ? fullNameMatch[1] : null;

        chrome.extension.onRequest.addListener(onRequest);
        chrome.extension.sendRequest({"fullName":fullName});
    });
})();
