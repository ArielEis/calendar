"use strict";

function NoteStorage(){
    this._storage = [];
}

NoteStorage.prototype.addNote = function(note){
    let isNotPushedYet = true;
    let index = 0;

    while(isNotPushedYet && index < this._storage.length){
        if (this.isEarlyDate(note._date, this._storage[index]._date)){
            this._storage.splice(index, 0, note);
            isNotPushedYet = false;
        }
        index++;
    }

    if(isNotPushedYet){
        this._storage.push(note);
    }
};


NoteStorage.prototype.getContentOfDate = function (date) {
    let content = [];

    for(let i = 0; i < this._storage.length; i++){
        if (this._storage[i]._date === date){
            content.push(this._storage[i]._content)
        }
    }

    return content;
};


NoteStorage.prototype.updateContentOfDate = function(date, index, content){
    let count = 0;

    for(let i = 0; i < this._storage.length; i++){
        if (this._storage[i]._date === date){
            count++;
            if (count === index){
                this._storage[i].updateContent(content);
                break;
            }
        }
    }
};


NoteStorage.prototype.deleteNote = function(date, index){
    let count = 0;

    for(let i = 0; i < this._storage.length; i++){
        if (this._storage[i]._date === date){
            count++;
            if (count === index){
                this._storage.splice(i, 1);
                break;
            }
        }
    }
};


NoteStorage.prototype.isEarlyDate = function(dateA, dateB) {
    dateA = dateA.split('/');
    dateB = dateB.split('/');

    if (parseInt(dateA[2]) > parseInt(dateB[2])) {
        return false;
    } else if (parseInt(dateA[2]) === parseInt(dateB[2])) {
        if (parseInt((dateA[1])) > parseInt(dateB[1])) {
            return false;
        } else if (parseInt(dateA[1]) === parseInt(dateB[1])) {
            if (parseInt(dateA[0]) > parseInt(dateB[0])){
                return false;
            }
        }
    }

    return true;
};