"use strict";

function Note(date, content){
    this._date = date;
    this._content = content;
}

Note.prototype.updateContent = function (content) {
    this._content = content;
};