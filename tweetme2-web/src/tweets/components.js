import React, {useEffect, useState} from 'react';
import {apiTweetDetail} from './lookup'
import {Tweet} from './detail'
import {TweetCreate} from './create'
import {TweetsList} from './list'
import {FeedList} from './feed'

export function FeedComponent(props){
  //it is main custom tag which is getting rendered into django
  const [newTweets, setNewTweets] = useState([])

  const canTweet = props.canTweet === "false" ? false : true

  const handleNewTweet = (newTweet) =>{
    //called when new tweet created
    //takes data from callback from TweetCreate
    //sends new Tweet data to TweetsList
    let tempNewTweets = [...newTweets]
      tempNewTweets.unshift(newTweet)//can hold multiple new tweets
      setNewTweets(tempNewTweets) 
    }

  return <div className={props.className}>
          {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />}
          <FeedList newTweets={newTweets} {...props} />
    </div>
}

export function TweetsComponent(props){
  //it is main custom tag which is getting rendered into django
  const [newTweets, setNewTweets] = useState([])

  const canTweet = props.canTweet === "false" ? false : true

  const handleNewTweet = (newTweet) =>{
    //called when new tweet created
    //takes data from callback from TweetCreate
    //sends new Tweet data to TweetsList
    let tempNewTweets = [...newTweets]
      tempNewTweets.unshift(newTweet)//can hold multiple new tweets
      setNewTweets(tempNewTweets) 
    }

  return <div className={props.className}>
          {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12mb-3' />}
          <TweetsList newTweets={newTweets} {...props} />
    </div>
}

export function TweetDetailComponent(props){
  const {tweetId} = props
  const [didLookup, setDidLookup] = useState(false)
  const [tweet, setTweet] = useState(null)

  const handleBackendLookup = (response, status) => {
    if (status === 200){
      setTweet(response)
    } else {
      alert("There was an error finding your tweet.")
    }
  }

  useEffect(() =>{
    if (didLookup === false){
      apiTweetDetail(tweetId, handleBackendLookup)
      setDidLookup(true)
    }
  },[tweetId, didLookup, setDidLookup])

  return tweet === null ? null : <Tweet tweet={tweet} className={props.className} />
}




