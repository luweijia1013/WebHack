/**
 * Created by luweijia on 2019/5/26.
 */

let sqlite3 = require('sqlite3');
database_user = Object.create(null);

//TODO: password needs to be salted/hash

function openUsersInfoDatabase(){

    database_user = new sqlite3.Database("usersinfo.db", function(err){
        if (err) {
            console.log(err.message);
            throw err;
        }
        else {
            console.log('Successfully open the usersinfo database');
            return database_user;
        }
    });

    // MEMORY DATABASE: just for reference
    // let database_mem = new sqlite3.Database(":memory",(err) => {
    //     if(err) {throw err;}
    // });
}

function closeUsersInfoDatabase(){

    database_user.close((err) => {
        if(err) {
            console.log(err.message);
            throw err;
        }
        else console.log('usersinfo database closed');
    });
}

//All elements of notes and attrbutes need to be string, length of notes and attributes must be same, empty note uses ''
function createTable(table_name, attributes, notes){
    let size = attributes.length;
    let sqlline = 'CREATE TABLE ' + table_name + '(';
    for(let i = 0; i < size; i++){
        if( i === size -1){
            sqlline += (attributes[i] + ' ' + notes[i] + ')');
        }
        else{
            sqlline += (attributes[i] + ' ' + notes[i] + ',');
        }
    }
    database_user.run(sqlline,function(err){
        if(err) {
            console.log('CREATE TABLE ERROR');
            console.log(err.message);
            throw err;
        }
        else{
            console.log('CREATE TABLE SUCCESSFULLY: '+sqlline);
        }
    });
}

function getAllUsersBasic(callback){
    let table_name = 'usersbasic';
    let sqlline = 'SELECT * FROM ' + table_name;
    database_user.all(sqlline, [], (err,rows)=>{
        if(err){
            console.log(err.message);
            throw err;
        }
        else{
            console.log('Query All succeed');
            // console.log(rows);
            // rows.forEach((row)=>{
            //     console.log(row);
            // });
        }
        callback(rows);
    });
}

function checkUsersBasicValid(callback, username, passwd){
    let table_name = 'usersbasic';
    let sqlline = 'SELECT * FROM ' + table_name + ' where username = ?';
    database_user.all(sqlline, [username], (err,rows)=>{
        if(err){
            console.log(err.message);
            throw err;
        }
        else{
            console.log(rows);
            // console.log(rows);
            // rows.forEach((row)=>{
            //     console.log(row);
            // });
            if(rows.length != 1){
                console.error('User Validation Error: Row length not 1')
            }
            else{
                if(passwd === rows[0].password){
                    callback(true);
                }
                else{
                    callback(false);
                }
            }
        }
    });
}

function insertGeneral(table_name, values){
    let sqlline = 'INSERT INTO ' + table_name + ' VALUES (';
    for(let i = 0; i < values.length; i++){
        if( i === values.length -1){
            sqlline += (values[i] + ')');
        }
        else{
            sqlline += (values[i] + ',');
        }
    }
    database_user.run(sqlline, function(err){
        if(err){
            console.log(err);
            throw err;
        }
        else{
            console.log('Successfully execute: ' + sqlline);
        }
    })
}

function insertUsersBasic(userid, username, password, email, callback){
    let table_name = 'usersbasic';
    let attributes = '(username, password, email)';
    let sqlline;
    if(userid >= 0){
        console.log("A non-negative userid is given");
        sqlline = 'INSERT INTO ' + table_name + ' VALUES (' + userid + ',' + username + ',' + password + ',' + email + ')';
    }
    sqlline = 'INSERT INTO ' + table_name + attributes + ' VALUES (' + username + ',' + password + ',' + email +')';
    // sqlline = 'INSERT INTO ' + table_name + attributes + ' VALUES (\'' + username + '\',\'' + password + '\',\'' + email +'\')';
    database_user.run(sqlline, function(err){
        if(err){
            console.log(err.type);
            console.log(err.message);
            // throw err;
            //existed username
            //TODO: error type: existed username, but also can be empty username etc.
            callback(false);
        }
        else{
            console.log('Successfully execute:' + sqlline);
            callback(true);
        }
    })
}

function updateUsersBasic(userid, password, email){
    let table_name = 'usersbasic';
    let sqlline = 'UPDATE ' + table_name + ' SET ';
    let values = new Array();
    if(password != ''){
        if(email != ''){
            values[0] = password;
            values[1] = email;
            values[2] = userid;
            sqlline += 'password = ?, email = ? where userid = ?';
        }
        else{
            values[0] = password;
            values[1] = userid;
            sqlline += 'password = ? where userid = ?';
        }
    }
    else{
        if(email != ''){
            values[0] = email;
            values[1] = userid;
            sqlline += 'email = ? where userid = ?';
        }
        else{
            console.log('All attributes are empty!!');
        }
    }
    database_user.run(sqlline, values, function(err){
        if(err){
            console.log(err);
            throw err;
        }
        else{
            console.log('Successfully execute:' + sqlline + ' , ' + values);
        }
    })
}

//TODO: query, update and delete

module.exports = {
    openUsersInfoDatabase,
    closeUsersInfoDatabase,
    createTable,
    getAllUsersBasic,
    checkUsersBasicValid,
    insertGeneral,
    insertUsersBasic,
    updateUsersBasic
}