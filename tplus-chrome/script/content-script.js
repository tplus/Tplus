(function () {
    var BREATHE_DELAY = 200,
        DEFAULT_COUNTRY_ABBREVIATION = 'CHN',
        DEFAULT_ACTIVITY_CODE = 'PWC0001 TIGER MISC',
        DEFAULT_DAILY_WORKING_HOURS = 8,
        MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        DEFAULT_REPOSITORY_URL = 'http://10.18.5.147:1911/shortlog/tip?revcount=1000';
    var endDate;

    function noOp() {
    }

    function fillTimeReport(timeRecords, currentIndex) {
        currentIndex = currentIndex || 0;
        if (currentIndex === timeRecords.length) {
            while (currentIndex < getExistingTimeRecordRowCount()) {
                clearTimeRecordFields(currentIndex++);
            }
            return;
        }
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
        setCountry(rowIndex, DEFAULT_COUNTRY_ABBREVIATION);
        setActivity(rowIndex, timeRecords[rowIndex].code);
        setBillableStatus(rowIndex, timeRecords[rowIndex].billable);
        setComment(rowIndex, timeRecords[rowIndex].comment);
        setWorkingHours(rowIndex, timeRecords[rowIndex].dayOfWeek, DEFAULT_DAILY_WORKING_HOURS);
    }

    function clearTimeRecordFields(rowIndex) {
        setCountry(rowIndex, '');
        setActivity(rowIndex, '');
        clearBillableStatus(rowIndex);
        setComment(rowIndex, '');
        setWorkingHours(rowIndex, -1, '');
    }

    function setCountry(rowIndex, country) {
        var countryDropdownListSelector = 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(0) select';
        $(countryDropdownListSelector).val(country);
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

    function clearBillableStatus(rowIndex) {
        var yesRadioButtonSelector = 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(4) input:eq(0)',
            noRadioButtonSelector = 'table:eq(1) tr:eq(' + (rowIndex + 1) + ') td:eq(4) input:eq(1)';
        $(yesRadioButtonSelector).removeAttr('checked');
        $(noRadioButtonSelector).removeAttr('checked');
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

    function onRequest(request) {
        if (!request || !request.initials || !request.endDate) return;
        new TimeSheetRecords().load(request, function(records){
            setEndDate(formatToTEDateString(new Date(request.endDate)));
            setExpenseStatus(false);
            fillTimeReport(records);
        });
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
