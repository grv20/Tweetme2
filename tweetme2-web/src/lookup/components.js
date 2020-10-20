
export function loadTweets(callback){
    const xhr = new XMLHttpRequest() //retrieval of data  from xhr for
    //purpose of continually modifying loaded web page underlying concept
    //of AJAX Design.
    const method = 'GET'
    const url = "http://localhost:8000/api/tweets/"
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method,url) //open up this method with this url
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
    xhr.send() //trigger the request after i send it up
  
  }