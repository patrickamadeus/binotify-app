const getAPI = (endpoint, callback, data) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;
        callback(this.responseText);
    }
    xhr.open("GET", endpoint);
    data ? xhr.send(data) : xhr.send();
};

const postAPI = (endpoint, callback, data) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        console.log(this.responseText)
        callback(this.responseText)
    };
    xhr.open("POST", endpoint);
    data ? xhr.send(data) : xhr.send();
};