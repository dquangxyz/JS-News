'use strict'
class User {
    constructor(firstName, lastName, username, password, passwordConfirm, settings = {pageSize: 5, category: "Sports"}){
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
        this.password = password
        this.passwordConfirm = passwordConfirm
        this.settings = settings
    }
}
class Task {
    constructor(task, owner, isDone) {
      this.task = task;
      this.owner = owner;
      this.isDone = isDone;
    }
  }
function parseUser(userData) {
    const user = new User(
        userData.firstName, 
        userData.lastName, 
        userData.username, 
        userData.password, 
        userData.passwordConfirm, 
        userData.settings
    )
    return user
}