function LogMessageHelper() {
    //this.logDescriptionPattern = /^\[(.*)\]\s*(#r{0,1}\d+)*/;
    this.logUserNamesPattern = /^\[(.*)\]/;
    this.logNumberPattern = /#r{0,1}\d+/;
}

LogMessageHelper.prototype = {
    isCheckedInBy: function(description, name){
        var result = description.toLowerCase().match(this.logUserNamesPattern);
        if(!!result){
            var users = result[1].split("&");
            return users.indexOf(name.toLowerCase()) != -1;
        }
        return false;
    },
    extractStoryOrDefectOrTaskNumber: function(description){
        var result = description.toLowerCase().match(this.logNumberPattern);
        if(!!result){
            return result[0];
        }
        return ""
    }

}



