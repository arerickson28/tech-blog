
let loginBtn = document.getElementById("loginBtn");
let signupBtn = document.getElementById("signupBtn");

loginBtn.addEventListener("click", async () => {
    event.preventDefault()

    let userNameLogin = document.getElementById("user-name-login").value.trim();
    let passLogin = document.getElementById("password-login").value.trim();
    console.log(userNameLogin)
    console.log(passLogin)

    if (userNameLogin && passLogin) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userNameLogin, passLogin }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

  
    // userNameLogin.value = ""
    // passLogin.value = ""
})









signupBtn.addEventListener("click", () => {
    let userNameSignup = document.getElementById("user-name-signup");
    let passSignup = document.getElementById("password-signup");    
    console.log(userNameSignup.value)
    console.log(passSignup.value)

    userNameSignup.value = ""
    passSignup.value = ""
})