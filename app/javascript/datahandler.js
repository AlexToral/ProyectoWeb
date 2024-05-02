"use strict";


function jsonToUser(json) {
    let user = JSON.parse(json);
    return new User(user._name, user._mail, user._password);
}

function userToJson(user) {
    return JSON.stringify(user);
}


function postToJson(post) {
    return JSON.stringify(post);
}

function jsonToPost(json) {
    let post = JSON.parse(json);
    return new Post(post._title, post._description, post._content, post._imageUrl, post._author, post._category);
}

function commentToJson(comment) {
    return JSON.stringify(comment);
}

function jsonToComment(json) {
    let comment = JSON.parse(json);
    return new Comment(comment._author, comment._content, comment._postIn);
}

exports.jsonToUser = jsonToUser;
exports.userToJson = userToJson;
exports.postToJson = postToJson;
exports.jsonToPost = jsonToPost;
exports.commentToJson = commentToJson;
exports.jsonToComment = jsonToComment;

