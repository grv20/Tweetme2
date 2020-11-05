import React, {useEffect, useState} from 'react';
import {apiTweetFeed} from './lookup';
import {Tweet} from './detail'

export function FeedList(props){
  //it will be called at start to load tweets
  //and then every time a new tweet is submitted

  const [tweetsInit, setTweetsInit] = useState([])//to make account of tweets when page refreshed
  const [tweets, setTweets] = useState([])//the final set of tweets to display 
  const [nextUrl, setNextUrl] = useState(null)
  const [tweetsDidSet, setTweetsDidSet] = useState(false)//to check if this fun is called initially
  // or when new tweet submitted


  useEffect(() =>{
    //to append new tweets
    const final = [...props.newTweets].concat(tweetsInit)
    if (final.length !== tweets.length) {
      setTweets(final)
    }

  }, [props.newTweets, tweets, tweetsInit])


  useEffect(() =>
  {
    //for getting tweet list initially when page is loaded.
    if (tweetsDidSet === false){
    const handleTweetListLookup = (response, status) => {
      //console.log(response,status)
      if(status === 200){
        setNextUrl(response.next)
        setTweetsInit(response.results)
        setTweetsDidSet(true)//to know this was called when loading the page
        //on setting true when new tweets added, this callback wont run!

      }
      
      
    }

    apiTweetFeed(handleTweetListLookup)
      
    }
  },[tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]) //[] it is dependency array, to denote what this useeffect is dependent on.
      

  const handleDidRetweet = (newTweet) => {
    //update tweetlist when retweet action is performed 
    const updateTweetsInit  = [...tweetsInit]
    updateTweetsInit.unshift(newTweet)
    setTweetsInit(updateTweetsInit)
    const updateFinalTweets  = [...tweets]
    updateFinalTweets.unshift(tweets)
    setTweets(updateFinalTweets)
    //console.log(tweets)

  }

  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl != null){
      const handleLoadNextResponse = (response, status) =>{
        if(status === 200){
          setNextUrl(response.next)
          const newTweets = [...tweets].concat(response.results)
          setTweetsInit(newTweets)
          setTweets(newTweets)
        }
        
      }
      apiTweetFeed(handleLoadNextResponse, nextUrl)
    }
  }

  return <React.Fragment>{tweets.map((item,index)=>{
    return <Tweet
      didRetweet = {handleDidRetweet}  
      tweet={item} className='my-5 py-5 border bg-white text-dark'
      key={`${index}-item.id`} />
  }
  )}
  {nextUrl !== null  && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load next</button>}
  </React.Fragment>
  //Keys help React identify which items have changed, are added, or are removed.
  // Keys should be given to the elements inside the array to give the elements a stable identity
    
    }


//-----------Use Effect----------
//you tell React that your component needs to do something after render.
// React will remember the function you passed
//and call it later after performing the DOM updates.
//Effects are declared inside the component so they have access to its props and state.
// By default, React runs the effects after every render — including the first render
//Every time we re-render, we schedule a different effect, replacing the previous one. 
//In a way, this makes the effects behave more like a part of the render result

//----------Map--------------
//The Map object holds key-value pairs and remembers the original insertion order of the keys.
//index in map function denotes position of item within array