
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
            body: JSON.stringify({ 
                userName: userNameLogin, 
                password: passLogin 
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(userNameLogin, passLogin)
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

  
    // userNameLogin.value = ""
    // passLogin.value = ""
})



signupBtn.addEventListener("click", async () => {
    event.preventDefault()
    let userNameSignup = document.getElementById("user-name-signup").value.trim();
    let passSignup = document.getElementById("password-signup").value.trim();    
    console.log(userNameSignup)
    console.log(passSignup)

    if (userNameSignup && passSignup) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({
                userName: userNameSignup,
                password: passSignup
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

    // userNameSignup.value = ""
    // passSignup.value = ""
})

