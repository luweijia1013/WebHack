'use strict';

let x = "Please enter username and password";
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
    let uName = $('#name').val();
    console.info(uName);
    let uPass = $('#password').val();
    console.info(uPass);
    if (uName === "" || uName === null) {
        addClass(ele.uName, "borderRed");
        x = "Username can't be empty";
        document.getElementById("tips").style.display = "inherit";
        return false;
    }else if (uPass === "" || uPass === null) {
        addClass(ele.uPass, "borderRed");
        x = "Password can't be empty";
        document.getElementById("tips").style.display = "inherit";
        return false;
    }else if (!checkLogin()){
        addClass(ele.name, "borderRed");
        addClass(ele.pwd, "borderRed");
        x = "Your username or password is wrong, please enter correct username or password";
        document.getElementById("tips").style.display = "inherit";
        return false;
    }else {
        return true;
    }
}

function checkLogin() {
    let name = $('#name').attr("value");
    let pwd = $('#password').attr("value");
    let datas = new Object();
    $.ajax({
        type: "post",
        contentType: "application/string",
        dataType: "json",
        async: false,
        url: "${base}/Login.htm?name=" + name + "&pwd=" + pwd,
        success: function (data) {
            datas= eval("(" + data + ")");
        }
    });
    if (datas.result === "nameFalse" || datas.result === "pwdFalse") {
        addClass(ele.name, "borderRed");
        addClass(ele.pwd, "borderRed");
        x = "Your username or password is wrong, please enter correct username or password";
        document.getElementById("tips").style.display = "inherit";
        return false;
    }else {
        return true;
    }
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
    let uName = document.getElementById("name").value;
    if (uName === "" || uName === null) {
        addClass(ele.uName, "borderRed");
        x = "Username can't be empty";
        document.getElementById("tips").style.display = "inherit";
        return false;
    }
    if (uName.length < 3 || uName.length > 15) {
        addClass(ele.uName, "borderRed");
        x = "The length of username must be between 3 and 15";
        document.getElementById("tips").style.display = "inherit";
        return false;
    }
    $.get("checkUserName.action", {"userName": uName}, function (data) {
        let d = $.parseJSON(data);
        console.log(d.success);
        if (d.success !== true) {
            addClass(ele.uName, "borderRed");
            x = "Username has already existed";
            document.getElementById("tips").style.display = "inherit";
            return true;
        }
    });
    return true;
}

function checkPass() {
    let uPass = document.getElementById("password").value;
    let urPass = document.getElementById("repeatpassword").value;
    if (uPass === "" || uPass === null) {
        addClass(ele.uPass, "borderRed");
        x = "Password can't be empty";
        document.getElementById("tips").style.display = "inherit";
        return false;
    }else if ((uPass !== "") && (uPass != null) && (uPass.length < 6 || uPass.length > 15)) {
        addClass(ele.uPass, "borderRed");
        x = "The length of password must be between 6 and 15";
        document.getElementById("tips").style.display = "inherit";
        return false;
    }else if (urPass === "" || urPass === null) {
        addClass(ele.uPass, "borderRed");
        x = "Repeat password can't be empty";
        document.getElementById("tips").style.display = "inherit";
        return false;
    }else if ((uPass !== urPass) && (uPass !== "") && (urPass !== "")) {
        addClass(ele.uPass, "borderRed");
        addClass(ele.urPass, "borderRed");
        x = "Inconsistent password entered twice";
        document.getElementById("tips").style.display = "inherit";
    }else {
        removeClass(ele.urPass, "borderRed");
        x = "Registration information submission";
        document.getElementById("tips").style.display = "inherit";
        return true;
    }
}

function checkEmail() {
    let uEmail = document.getElementById("email").val();
    let reg = /^[0-9a-zA-Z][_.0-9a-zA-Z-]{0,31}@([0-9a-zA-Z][0-9a-zA-Z-]{0,30}[0-9a-zA-Z]\.){1,4}[a-z]{2,4}$/;
    let regResult = reg.test(uEmail);
    if (!regResult) {
        addClass(ele.uEmail, "borderRed");
        x = "Please enter your real Email";
        document.getElementById("tips").style.display = "inherit";
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
    return tmpl.replace(/{(\w+)})/g, function (m1, m2) {
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