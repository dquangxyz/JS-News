'use strict'

function saveToStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// const keyUserArr = "USER_ARRAY"
// const userArr = getFromStorage(keyUserArr) ? getFromStorage(keyUserArr) : []

// const keyCurrentUser = "CURRENT_USER"
// const currentUser =  getFromStorage(keyCurrentUser) ? parseUser(getFromStorage(keyCurrentUser)) : null

// const keyToDoArr = "TO-DO-LIST"
// const toDoArr = getFromStorage(keyToDoArr) ? getFromStorage(keyToDoArr) : []



