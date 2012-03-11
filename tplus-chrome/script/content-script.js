(function () {
    var BREATHE_DELAY = 200,
        DEFAULT_COUNTRY_ABBREVIATION = 'CHN',
        DEFAULT_HOLIDAY_CODE = 'TW_TOFF LEAVE PUBLIC_HOLIDAY',
        DEFAULT_ANNUAL_LEAVE_CODE = 'TW_TOFF LEAVE ANNUAL_LV',
        DEFAULT_SICK_LEAVE_CODE = 'TW_TOFF SICK SICK_LV',
        DEFAULT_DAILY_WORKING_HOURS = 8,
        MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        CODE_TO_COMMENT_MAP = buildCodeToCommentMap();

    function noOp() {
    }

    function buildCodeToCommentMap() {
        var codeToCommentMap = {};
        codeToCommentMap[DEFAULT_HOLIDAY_CODE] = "public holiday";
        codeToCommentMap[DEFAULT_ANNUAL_LEAVE_CODE] = "annual leave";
        codeToCommentMap[DEFAULT_SICK_LEAVE_CODE] = "sick leave";
        return codeToCommentMap;
    }

    function addTimeRecordWithCode(code) {
        getFirstUnfilledTimeRecordAndThen(function (index) {
            setTimeRecordFields({
                code:code,
                comment:getDefaultComment(code),
                billable:false}, index);
        });
    }

    function getDefaultComment(code) {
        var comment = CODE_TO_COMMENT_MAP[code] || "";
        return comment;
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

    function getFullName() {
        var fullNameSelector = '#content h1',
            fullNamePattern = /^Add Time Report for (.*)$/,
            fullNameMatch = $(fullNameSelector).text().match(fullNamePattern),
            fullName = fullNameMatch && fullNameMatch[1] ? fullNameMatch[1] : null;
        return fullName;
    }

    function getExistingTimeRecordRowCount() {
        var existingTimeRecordCountSelector = 'table:eq(1) tr';
        return $(existingTimeRecordCountSelector).length - 2;
    }

    function getFirstUnfilledTimeRecordIndex(rows) {
        var index = -1;
        for (var i = 0; i < rows.length; i++) {
            var activity = $(rows[i]).find('input[id*="_activity"]');
            if (activity && activity.length == 1 && !activity.val()) {
                index = i;
                break;
            }
        }
        return index;
    }

    function getFirstUnfilledTimeRecordAndThen(callback) {
        var rows = $('table:eq(1)>tbody>tr[id*="time_record_"]');
        var index = getFirstUnfilledTimeRecordIndex(rows);
        if (index != -1) {
            callback(index);
        } else {
            addNewRowInTableAndThen(callback);
        }
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
            (callbackFn || noOp)(expectedNumOfRows - 1);
        }
        else {
            setTimeout(function () {
                waitUntilNewRowPresentAndThen(expectedNumOfRows, callbackFn)
            }, BREATHE_DELAY)
        }
    }

    function fillTimeRecordAndContinue(timeRecords, currentIndex) {
        setTimeRecordFields(timeRecords[currentIndex], currentIndex);
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

    function setTimeRecordFields(timeRecord, rowIndex) {
        setCountry(rowIndex, DEFAULT_COUNTRY_ABBREVIATION);
        setActivity(rowIndex, timeRecord.code);
        setBillableStatus(rowIndex, timeRecord.billable);
        setComment(rowIndex, timeRecord.comment);
        setWorkingHours(rowIndex, timeRecord.dayOfWeek, DEFAULT_DAILY_WORKING_HOURS);
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
        var getDayOfWeekTextBox = function (rowIndex, dayOfWeek) {
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

    function getDefaultEndDate() {
        var today = new Date(),
            dayOfWeek = today.getDay() == 0 ? 7 : today.getDay(),
            endDate = dayOfWeek == 1
                ? new Date(today.getTime() - MILLI_SECONDS_IN_ONE_DAY)
                : new Date(today.getTime() + (7 - dayOfWeek) * MILLI_SECONDS_IN_ONE_DAY);
        return endDate;
    }

    function retrieveLogEntriesAndFillTimeReport(searchParams) {
        new TimeSheetRecords().load(searchParams, function (records) {
            setEndDate(formatToTEDateString(new Date(searchParams.endDate)));
            setExpenseStatus(false);
            fillTimeReport(records);
            if(searchParams.aliases instanceof Array && searchParams.aliases.length > 1) {
                var imgUrl = chrome.extension.getURL("/image/tplus.png"),
                    message = $('<div class="tplus-message"></div>');
                message.append('<p>T+ thinks that your alias might be: </p>');
                var innerLinks = [];
                _.each(searchParams.aliases, function(alias) {
                    innerLinks.push('<a class="tplus-alias" href="javascript:void(0);">' + alias + '</a>');
                });
                message.append(innerLinks.join(", "));
                $(message).delegate('a', 'click', function(e) {
                    $(message).find('a.tplus-alias').removeClass("selected");
                    $(this).addClass("selected");
                    chrome.extension.sendRequest({"fullName":getFullName(), "aliases":$(this).text()});
                });
                message.append('<p>So, which are you?</p>');
                $('body').append(message);
            }
        });
    }

    function onRequest(request) {
        if (!request || !request.action || !request.params) return;
        var searchParams = request.params;
        searchParams.endDate = searchParams.endDate || getDefaultEndDate();
        if (request.action == 'fillWorkRecords') {
            retrieveLogEntriesAndFillTimeReport(searchParams);
        } else if (request.action == 'addTimeRecord') {
            addTimeRecordWithCode(searchParams['code']);
        }
    }

    $(function () {
        var fullName = getFullName();
        chrome.extension.onRequest.addListener(onRequest);
        chrome.extension.sendRequest({"fullName":fullName, "aliasProposals":guessAlias(fullName)});
    });
})();
