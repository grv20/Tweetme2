import React, {useEffect, useState} from 'react';
import {loadTweets} from '../lookup'
  
export function TweetsList(props){
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
    return tweets.map((item,index)=>{
      return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-item.id`} />
    }
    )
  
  }

export function ActionBtn(props) {
    const {tweet,action} = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
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
    return <button className={className} onClick={handleClick}>{display} </button>
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