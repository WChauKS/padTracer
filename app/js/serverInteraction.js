// dragPath is defined globally
// need to update
$("#submitPath")
    .on("click", function(){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/path', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        var data = JSON.stringify({
            dragPath: dragPath
        })
        // console.log(data);
        xhr.send(data);
    });