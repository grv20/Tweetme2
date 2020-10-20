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
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    return action.type === 'like' ? <button className={className}>{tweet.likes} Likes </button> : null
  }
  
  
export function Tweet(props){
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