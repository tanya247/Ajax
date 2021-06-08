let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs" + " " + date.getMinutes() + "Min" + " " + date.getSeconds() + "Sec";
}

function makePromiseCall(methodType, url, callback, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            //console.log(methodType +" state change called at "+showTime()+" where ready state " +xhr.readyState+ " and status code "+xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            }
            else if (xhr.status.toString().match('[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data))
        }
        else xhr.send();
    });
    console.log("request send to the server" + showTime());

}
const getURL = "http://127.0.0.1:3000/AddressBook/";
function getUserData(data) {
    console.log("user data: " + data);
}
makePromiseCall("GET", getURL, getUserData, true);
const pushURL = "http://localhost:3000/AddressBook/";
const addressbookdata = { "firstName": "Pranshu", "lastName": "Kumar", "address": "Kannauj", "city": "Kanpur", "state": "UP", "zip": "245524", "phoneNo": "98754788777", "email": "xyGabxt@gmail.com" };
function pushUserData(data) {
    console.log("user data " + data)
}
makePromiseCall("POST", pushURL, pushUserData, true, addressbookdata)
    .then(responseText => {
        console.log("User Added: "+responseText);
    })
    .catch(error => console.log("POST ERROR STATUS: ")+JSON.stringify(error));
