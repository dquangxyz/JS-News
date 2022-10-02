'use strict'

const category = document.getElementById('input-category')
const pageSize = document.getElementById('input-page-size')
const settingsBtn = document.getElementById('btn-submit')

const keyUserArr = "USER_ARRAY"
const userArr = getFromStorage(keyUserArr) ? getFromStorage(keyUserArr) : []
const keyCurrentUser = "CURRENT_USER"
const currentUser =  getFromStorage(keyCurrentUser) ? parseUser(getFromStorage(keyCurrentUser)) : null

if (currentUser) {
    pageSize.value = currentUser.settings.pageSize
    category.value = currentUser.settings.category
    settingsBtn.addEventListener('click', function () {
        const validateCheck = validateData()
        if (validateCheck) {
            currentUser.settings = {pageSize: pageSize.value, category: category.value}
            console.log(currentUser)
            saveToStorage(keyCurrentUser, currentUser)

            const index = userArr.findIndex(item => item.username === currentUser.username)
            console.log(index)
            userArr[index] = currentUser
            saveToStorage(keyUserArr, userArr)
            alert("Successfully update your settings")
        }
    })
}

function validateData() {
    let status = true;
    if (pageSize.value == "") {
        alert("Please insert number of news per page!")
        status = false
    }
    if (category.value === "General") {
        alert("Please select a catogory!")
        status = false
    }
    return status
}