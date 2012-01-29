function getResponse(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

function showHtml(s){
   $(".htmlDom").html(s);
}

getResponse("http://www.baidu.com",showHtml);





