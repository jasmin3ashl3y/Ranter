async function newFormHandler(event) {
    event.preventDefault();
  
    //const text = document.querySelector('input[name="text"]').value;
    const text = document.getElementById("rant-textarea").value;
    console.log(text)
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      //how to add new post to feed
      document.location.reload('/feed');
      console.log('success')
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#submit-rant').addEventListener('click', newFormHandler);