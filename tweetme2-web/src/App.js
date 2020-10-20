import React, {useCallback, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';



function loadTweets(callback){
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


function ActionBtn(props) {
  const {tweet,action} = props
  const className = props.className ? props.className : 'btn btn-primary btn-sm'
  return action.type === 'like' ? <button className={className}>{tweet.likes} Likes </button> : null
}


function Tweet(props){
  //props are argument passed to react components
  //props are an object, do console.log to find it out
  //console.log(props)
  const {tweet} = props
  const className = props.className ? props.className : 'col-10mx-auto cold-md-6'
  return <div className={className}>
    <p>{tweet.id}-{tweet.content}</p>
    <div className='btn btn-group'>
      <ActionBtn  tweet={tweet} action={{type:"like"}} />
      <ActionBtn  tweet={tweet} action={{type:"unlike"}} />
    </div>

  </div>
}


function App() {
  const [tweets, setTweets] = useState([])
  
  useEffect(() =>
  {
    //myCallback is a function which takes response and status as parameter
    const myCallback = (response, status) => {
      //console.log(response,status)
      if(status === 200){
        setTweets(response)

      }
      else{
        alert("There was an error")
      }
      
    }
    // do my lookup
    //we are passing a function as an argument to another function
    //It will be async callback since first request to load tweets willbe made
    //and depending on response myCallback will be called 
    loadTweets(myCallback);
    //The Map object holds key-value pairs and remembers the original insertion order of the keys.
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {tweets.map((item,index)=>
            <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-item.id`} />
          )}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
