//current dateTime variable
let current = new Date();
let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
let seconds
let secondsUnfixed = current.getSeconds();
let cTime = current.getHours().toString().padStart(2, '0') + ":" + current.getMinutes().toString().padStart(2, '0') + ":" + current.getSeconds().toString().padStart(2, '0');
let dateTime = cDate + 'T' + cTime + '+05:00';

//postal codes
let NYCpostalCode = 'postal_US10001'
let TampapostalCode = 'postal_US33592'
let SFpostalCode = 'postal_US94016'
let SeattlepostalCode = 'postal_US98101'
let ChicagopostalCode = 'postal_US60007'

//working fetch requests
username='_stevens'
password='NMU50sm4cs'
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

fetch('https://login.meteomatics.com/api/v1/token', {
    method: 'GET', headers: headers
}).then(function (resp) {
    return resp.json();
}).then(function (data) {
    var token = data.access_token;
    //console.log(token);
    fetch(`https://api.meteomatics.com/${dateTime}/t_2m:F,t_2m:C,precip_1h:mm,wind_speed_2m:mph,relative_humidity_2m:p/${NYCpostalCode}+${TampapostalCode}+${SFpostalCode}+${SeattlepostalCode}+${ChicagopostalCode}/json?access_token=${token}`) 
        .then(function(r){
            return r.json()
        })
        .then(console.log)
}).catch(function (err) {
    console.log('something went wrong', err);
});