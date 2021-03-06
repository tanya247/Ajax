let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime()
{
    const date = new Date();
    return date.getHours()+"Hrs" + " " + date.getMinutes()+"Min" +" "+ date.getSeconds()+"Sec";
}

function makeAjaxCall(methodType,url,callback,async=true,data=null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange =function(){
        //console.log(methodType +" state change called at "+showTime()+" where ready state " +xhr.readyState+ " and status code "+xhr.status);
        if(xhr.readyState === 4){
            if(xhr.status === 200||xhr.status === 201){
                callback(xhr.responseText);
            }
            else if(xhr.status>=400){
                console.log("Handle 400 client Error OR 500 Service Error")
            }
        }


    }
    xhr.open(methodType,url,async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data))
    }
    else xhr.send();
    console.log("request send to the server"+showTime());

}
const getURL = "http://127.0.0.1:3000/AddressBook/";
function getUserData(data){
    console.log("user data: "+data);
}
makeAjaxCall("GET",getURL, getUserData, true);
const pushURL = "http://localhost:3000/AddressBook/";
const addressbookdata = {"firstName": "Pranshu","lastName": "Kumar","address": "Kannauj","city": "Kanpur","state":"UP","zip": "245524","phoneNo": "98754788777","email": "xyGabxt@gmail.com"};
function pushUserData(data){
    console.log("user data "+data)
}
makeAjaxCall("POST", pushURL, pushUserData, true, addressbookdata);
