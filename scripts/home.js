'use strict'

const loginModal = document.getElementById("login-modal")
const mainContent = document.getElementById("main-content")
const logoutBtn = document.getElementById("btn-logout")

const keyCurrentUser = "CURRENT_USER"
const currentUser =  getFromStorage(keyCurrentUser) ? parseUser(getFromStorage(keyCurrentUser)) : null

console.log(currentUser)
if (currentUser){
    mainContent.querySelector("p").textContent = `Welcome ${currentUser.firstName}`
    loginModal.style.display = "none"
} else {
    mainContent.style.display = "none"
    loginModal.style.display = "block"
}

logoutBtn.addEventListener('click', function(){
    localStorage.removeItem(keyCurrentUser)
    window.location.assign('../pages/login.html')
})
