"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, response => {
    if (response.success === false) {
        userForm.setLoginErrorMessage(response.error);
    } else {
        location.reload();
    }
});

userForm.registerFormCallback = data => ApiConnector.register(data, response => {
    console.log(data);
    if (!data.login.includes("@")) {
        userForm.setRegisterErrorMessage("Поле 'Логин' должно содержать символ '@'")    
    } else {
        location.reload();
    }
})