import React, {useEffect, useState} from 'react';
import {loadTweets, createTweet} from '../lookup';

export function TweetsComponent(props){
  const textAreaRef = React.createRef()
  const [newTweets, setNewTweets] = useState([])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    
    let tempNewTweets = [...newTweets] //taking any number of args
    // The rest parameter operator is used in function parameter lists 
    //with the format: ...variable and it will include within that variable 
    //the entire list of uncaptured arguments that the function was called with
    //console.log(newTweets.length)
    createTweet(newVal, (response, status) =>{
      if (status === 201){
        tempNewTweets.unshift(response)
      }else{
        console.log(response)
        alert("An error occured please try again")
      }
    })
    setNewTweets(tempNewTweets)
    textAreaRef.current.value = ''
  }

  return <div className={props.className}>
          <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
              <textarea ref={textAreaRef}required={true} className='form-control' name='tweet'>

              </textarea>
              <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
          </div>
          <TweetsList newTweets={newTweets} />
    </div>
}



export function TweetsList(props){
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)

    useEffect(() =>{
      //you tell React that your component needs to do something after render.
      // React will remember the function you passed
      //and call it later after performing the DOM updates.
      //Effects are declared inside the component so they have access to its props and state.
      // By default, React runs the effects after every render — including the first render
      //Every time we re-render, we schedule a different effect, replacing the previous one. 
      //In a way, this makes the effects behave more like a part of the render result
      const final = [...props.newTweets].concat(tweetsInit)
      if (final.length !== tweets.length) {
        setTweets(final)
      }

    }, [props.newTweets, tweets, tweetsInit])

    useEffect(() =>
    {
      if (tweetsDidSet === false){
        //myCallback is a function which takes response and status as parameter
      const myCallback = (response, status) => {
        //console.log(response,status)
        if(status === 200){
          setTweetsInit(response)
          setTweetsDidSet(true)
  
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

      }
      
      //The Map object holds key-value pairs and remembers the original insertion order of the keys.
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet]) //[] it is dependency array, to denote what this useeffect is dependent on.
    //index in map function denotes position of item within array
    return tweets.map((item,index)=>{
      return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-item.id`} />
    }
    )
    //Keys help React identify which items have changed, are added, or are removed.
    // Keys should be given to the elements inside the array to give the elements a stable identity
  
  }

export function Tweet(props){
  //props are argument passed to react components
  //props are an object, do console.log to find it out
  //console.log(props)
  const {tweet} = props
  const className = props.className ? props.className : 'col-10mx-auto cold-md-6'

  return <div className={className}>
          <p>{tweet.id} - {tweet.content}</p>
          <div className='btn btn-group'>
            <ActionBtn  tweet={tweet} action={{type:"like", display:"Likes"}} />
            <ActionBtn  tweet={tweet} action={{type:"unlike", display:"UnLike"}} />
            <ActionBtn  tweet={tweet} action={{type:"retweet", display:"Retweet"}} />
          </div>
        </div>
}

export function ActionBtn(props) {
    const {tweet,action} = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    //argument passed to useState sets initial state of first parameter i.e. likes
    //The setState function is used to update the state. 
    //It accepts a new state value and enqueues a re-render of the component.
    //Normally, variables “disappear” when the function exits but state variables are preserved by React.
    //likes is variable(initialized with tweet.likes or 0) and setLikes is function
    const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false)
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    
    const handleClick = (event) => {
      event.preventDefault()
      if (action.type === 'like'){
        if(userLike === true) {
          setLikes(likes - 1)
          setUserLike(false)
        }else{
        setLikes(likes+1)
        setUserLike(true)
      }}
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : `${actionDisplay}` 
    return <button className={className} onClick={handleClick}> {display} </button>
  }
  
