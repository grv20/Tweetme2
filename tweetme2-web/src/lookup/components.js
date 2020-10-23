
function getCookie(name) {
  //for using csrf_tokens
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}



export function backendLookup(method, endpoint, callback, data){
  //sends requests to api and handle response
  let jsonData;
  if(data){
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest() //retrieval of data  from xhr for
  //purpose of continually modifying loaded web page underlying concept
  //of AJAX Design.
  const url = `http://localhost:8000/api${endpoint}`
  xhr.responseType = "json"
  const csrftoken = getCookie('csrftoken');
  xhr.open(method,url) //open up this method with this url
  xhr.setRequestHeader("Content-Type", "application/json")
  
  if(csrftoken){
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest") //In order to make django return "true" when queried request.is_ajax()
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  xhr.setRequestHeader("X-CSRFToken", csrftoken) //to add csrf_token via ajax
  }
  
  xhr.onload = function(){
    callback(xhr.response,xhr.status)
  }
  xhr.onerror = function (e){
    console.log(e)
    //we are basically calling myCallback with parameters response and status
    callback({"message": "The request was an error!"}, 400)
    //A callback function is a function passed into another function as an argument,
    // which is then invoked inside the outer function to complete some kind of routine or action.
  }
  xhr.send(jsonData) //trigger the request after i send it up
}

