const signUp = document.getElementById('signUp');
const login = document.getElementById('login');

function getLogin(){
    console.log('hello')
    signUp.classList.add('d-none')
    login.classList.remove('d-none')
}
function getSignup(){
    console.log('hello2')
    login.classList.add('d-none');
    signUp.classList.remove('d-none');
}