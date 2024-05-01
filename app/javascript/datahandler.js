"use strict";

function jsonToUser(json) {
    let user = JSON.parse(json);
    return new User(user._name, user._mail, user._password);
}

function userToJson(user) {
    return JSON.stringify(user);
}