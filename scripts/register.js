'use strict'

const firstName = document.getElementById("input-firstname")
const lastName = document.getElementById("input-lastname")
const username = document.getElementById("input-username")
const password = document.getElementById("input-password")
const passwordConfirm = document.getElementById("input-password-confirm")

const registerBtn = document.getElementById("btn-submit")

const keyUserArr = "USER_ARRAY"
const userArr = getFromStorage(keyUserArr) ? getFromStorage(keyUserArr) : []

function validate(objt){
    let status = true
    // Check if the input is empty
    let emptyInput = false
    for (const key in objt){
        if (objt[key] == ""){
            alert(`Please provide ${key} !`)
            emptyInput = true
            status = false
            break
        }
    }
    if (!emptyInput){
        // Check if username has existed
        userArr.forEach(user => {
            if (user.username == objt.username){
                alert("This username has been taken, please choose another username")
                status = false
            }
        })
        // Check if password is simmilar to confirm password
        if (objt.password !== objt.passwordConfirm){
            alert("Confirmed password does not match Password, please confirm password again")
            status = false
        }
        // Check password length
        if (objt.password.length < 8){
            alert("Password length must be more than 8 characters")
            status = false
        }
    } 
    return status
}

registerBtn.addEventListener('click', function(){
    const data = new User (firstName.value, lastName.value, username.value, password.value, passwordConfirm.value)
    if (validate(data)){
        userArr.push(data)
        saveToStorage(keyUserArr, userArr)
        alert("Successfully registered")
        window.location.href = '../pages/login.html'
    }
})