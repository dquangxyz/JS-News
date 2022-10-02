'use strict'

const loginBtn = document.getElementById("btn-submit")
const inputUsername = document.getElementById("input-username")
const inputPassword = document.getElementById("input-password")

const keyUserArr = "USER_ARRAY"
const userArr = getFromStorage(keyUserArr) ? getFromStorage(keyUserArr) : []
const keyCurrentUser = "CURRENT_USER"
const currentUser =  getFromStorage(keyCurrentUser) ? parseUser(getFromStorage(keyCurrentUser)) : null

loginBtn.addEventListener('click', function(){
    if (inputUsername.value == ""){
        alert("Please enter username")
    } else if (inputPassword.value == ""){
        alert("Please enter password")
    } else {
        // Check if username and password match
        let isFound = false
        userArr.forEach(user => {
            if (user.username == inputUsername.value && user.password == inputPassword.value){
                console.log(user)
                saveToStorage(keyCurrentUser, user)
                isFound = true
                // alert("Log in successfully !")
                window.location.assign('../index.html')
            }
        })
        if (isFound === false){
            alert("Username and/or Password is not correct")
        }
    }
    console.log(currentUser)
})