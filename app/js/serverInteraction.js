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

// add sockets to switch from connect to disconnect and vice versa
$("#connectSerial")
    .on("click", function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/connect', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        // var connect = connect or disconnect, place variable in data
        var data = JSON.stringify({
            connect: "connect"
        });
        // console.log(data);
        xhr.send(data);
    })