

async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/login', {
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

  //const chooseUsername = document.querySelector('#choose-username-signup').value.trim();
  const choosePassword = document.querySelector('#choose-password-signup').value.trim();
  const confirmPassword = document.querySelector('#confirm-password-signup').value.trim();

  // function validation(){
  //   var chooseUsername = document.getElementById("choose-username-signup");
  //        if(username.value.length <= 20 && user.value.length >= 3){
  //        }
  //        else{
  //            alert("Username has to be between 3-20 characters.")
  //         }
  //        //duplication data list
  //        var user = document.getElementById("user");
  //        if(user.value == list.value){
  //        }
  //        else{
  //            alert("Username already exists.")
  //         }

  if (choosePassword && confirmPassword === true) {
    const response = await fetch('/api/login', {
      method: 'get',
      body: JSON.stringify({
        chooseUsername,
        choosePassword,
        confirmPassword
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



  
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

document.querySelector('#test').addEventListener('click', (e) => {
  e.preventDefault()
  console.log('success!')
})