describe("merge records from different repositories", function(){

   var recordsMerger = new RecordsMerger();

   function createRecord(dayOfWeek, comment, code){
       return {
                "dayOfWeek": dayOfWeek,
                "comment": comment,
                "code" : code,
                "billable": true
       }
   }

   function verifyRecord(expectedRecord, actualRecord){
        expect(actualRecord.dayOfWeek).toBe(expectedRecord.dayOfWeek);
        expect(actualRecord.comment).toBe(expectedRecord.comment);
        expect(actualRecord.code).toBe(expectedRecord.code);
   }


   it("should return records without duplication given same logs from two repositories with same code", function() {
       var record = createRecord(4,"#747", "p1");
       var recordsFromRepoA=[record];
        var recordsFromRepoB=[record];
        var result = recordsMerger.mergeByCode([recordsFromRepoA, recordsFromRepoB]);
        expect(result).not.toBe(null);
        expect(result.length).toBe(1);
        verifyRecord(record, result[0]);
    });


    it("should return correct timesheet record given one valid log", function () {
        var logs = [
            {"dayOfWeek":4, "comment":"#74"}
        ];
        var result = recordsMerger.mergeByDate(logs);
        expect(result).not.toBe(null);
        expect(result.length).toBe(1);
        expect(result[0].dayOfWeek).toBe(4);
        expect(result[0].comment).toBe("#74");
    });

    it("should return correct timesheet record given two duplicate valid logs in same day", function () {
        var logs = [
            {"dayOfWeek":4, "comment":"#74"},
            {"dayOfWeek":4, "comment":"#74"}
        ];
        var result = recordsMerger.mergeByDate(logs);
        expect(result).not.toBe(null);
        expect(result.length).toBe(1);
        expect(result[0].comment).toBe("#74");
    });

    it("should return correct timesheet record given multiple logs in one day", function () {
        var logs = [
            {"dayOfWeek":4, "comment":"#74"},
            {"dayOfWeek":4, "comment":"#74"},
            {"dayOfWeek":4, "comment":"#745"},
            {"dayOfWeek":4, "comment":"#461"}
        ];
        var result = recordsMerger.mergeByDate(logs);
        expect(result).not.toBe(null);
        expect(result.length).toBe(1);
        expect(result[0].comment).toBe("#74,#745,#461");
    });
});

