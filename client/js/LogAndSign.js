'use strict';

let http = require('http');

let x = "Please enter username and password";
let querystring = require('querystring');
let HOST = 'localhost';
let PORT = 8080;
fnLogin();

function tips() {
    document.getElementById("tips").innerHTML = x;
}

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) {
        obj.className += "" + cls;
    }
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$');
        obj.className = obj.className.replace(reg, "");
    }
}

function fnLogin() {
    let uName = document.getElementById("id_name").value;
    console.info(uName);
    let uPass = document.getElementById("id_password").value;
    console.info(uPass);
    if (uName === "" || uName === null) {
        alert("Username can't be empty");
        return false;
    }else if (uPass === "" || uPass === null) {
        alert("Password can't be empty");
        return false;
    }else if (checkLogin() === '0') {
        alert("Sorry, you entered wrong username or password");
        return false;
    }else if(checkLogin() === '1') {
        window.location.href = '../client/index.html';
        return true;
    }
}

function checkLogin() {
    let uName = document.getElementById("id_name").value;
    console.info(uName);
    let uPass = document.getElementById("id_password").value;
    console.info(uPass);
    http.get({
            'host': HOST,
            path: '/?tag=login&username=' + uName + '&password=' + uPass,
            port: 8080
        }, function (res) {
            res.setEncoding('utf-8');
            res.on('data', function (data) {
                console.log(data);
            })
        });
        return data;

}

function fnRegister() {
    if (!checkName()) {
        return false;
    }else if (!checkPass()) {
        return false;
    }else if (!checkEmail()) {
        return false;
    }
    return true;
}

function checkName() {
    let uName = document.getElementById("id_name").value;
    console.info(uName);

    if (uName === "" || uName === null) {
        alert("Username can't be empty");
        return false;
    }
    if (uName.length < 3 || uName.length > 15) {
        // addClass(ele.uName, "borderRed");
        // x = "The length of username must be between 3 and 15";
        // document.getElementById("tips").style.display = "inherit";
        alert("The length of username must be between 3 and 15");
        return false;
    }
    $.get("checkUserName.action", {"userName": uName}, function (data) {
        let d = $.parseJSON(data);
        console.log(d.success);
        if (d.success !== true) {
            // addClass(ele.uName, "borderRed");
            // x = "Username has already existed";
            // document.getElementById("tips").style.display = "inherit";
            alert("Username has already existed");
            return true;
        }
    });
    return true;
}

function checkPass() {
    let uPass = document.getElementById("id_password").value;
    console.info(uPass);
    let urPass = document.getElementById("repeatpassword").value;
    if (uPass === "" || uPass === null) {
        alert("Passwrod can't be empty");
        return false;
    }else if ((uPass !== "") && (uPass != null) && (uPass.length < 6 || uPass.length > 15)) {
        alert("The length of username must be between 6 and 15");
        return false;
    }else if (urPass === "" || urPass === null) {
        alert("Repeat password can't be empty");
        return false;
    }else if ((uPass !== urPass) && (uPass !== "") && (urPass !== "")) {
        alert("Inconsistent password entered twice");
    }else {
        return true;
    }
}

function checkEmail() {
    let uEmail = document.getElementById("email").val();
    let reg = /^[0-9a-zA-Z][_.0-9a-zA-Z-]{0,31}@([0-9a-zA-Z][0-9a-zA-Z-]{0,30}[0-9a-zA-Z]\.){1,4}[a-z]{2,4}$/;
    let regResult = reg.test(uEmail);
    if (!regResult) {
        alert("Please enter your real email");
        return false;
    }
    return true;
}

function formatTemplate(dta, tmpl) {
    let format = {
        name: function (x) {
            return x;
        }
    };
    return tmpl.replace(/{(\w+)}/g, function (m1, m2) {
        if (!m2) {
            return "";
        }
        return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];
    });

    function load() {
        $.ajax({
            url: 'Request_Dispatch',
            type: 'get',
            data: {
                state: 107,
                ActivityID: getQueryString("Activity"),
            },
            cache: false,
            dataType: "json",
            success: function (dta) {
                dta = JSON.parse(dta);
                if (!dta || !dta.rows || dta.rows.length <= 0) {
                    return alert(dta.rows);
                }
                document.getElementById("allcost").innerHTML = dta.allcost
                let html = $('script[type="text/template"]').html();
                let arr = [];
            }

        })
    }
}
