describe("merge records from different repositories", function(){

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
        var result = new RecordsMerger().merge([recordsFromRepoA, recordsFromRepoB]);
        expect(result).not.toBe(null);
        expect(result.length).toBe(1);
        verifyRecord(record, result[0]);
    });
});

