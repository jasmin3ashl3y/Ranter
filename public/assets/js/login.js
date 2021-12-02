const formContainer = document.getElementById("signinUpContainer");
const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");

async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(username, password);
    if (username && password) {
      const response = await fetch('/api/user/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/feed');
      } else {
        alert(response.statusText);
      }
    }
  }

  async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/user/', {
            method: 'post',
            body: JSON.stringify({
                username, 
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        //check response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/feed');
        } else {
            alert(response.statusText);
        }
    }
}

function toggleForms(e) {
  e.preventDefault();
  const target = e.target;
  
  if (target.id=="switch-to-signup") {
    signinForm.classList.add("hide");
    signupForm.classList.remove("hide");
  } else if(target.id == "switch-to-signin") {
    signupForm.classList.add('hide');
    signinForm.classList.remove('hide');
  }

}

formContainer.addEventListener('click', toggleForms);
  
document.querySelector('#signin').addEventListener('click', loginFormHandler);
document.querySelector('#signup').addEventListener('click', signupFormHandler);

