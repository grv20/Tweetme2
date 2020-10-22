function lookup(method, endpoint, callback, data){
  let jsonData;
  if(data){
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest() //retrieval of data  from xhr for
    //purpose of continually modifying loaded web page underlying concept
    //of AJAX Design.
    const url = `http://localhost:8000/api${endpoint}`
    xhr.responseType = "json"
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
    xhr.send(jsonData) //trigger the request after i send it up
}

export function loadTweets(callback){
  lookup("GET","/tweets/", callback)
  }