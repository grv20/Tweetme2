import React, {useState} from 'react';
import {TweetCreate} from './create'
import {TweetsList} from './list'


export function TweetsComponent(props){
  //it is main custom tag which is getting rendered into django
  const [newTweets, setNewTweets] = useState([])

  const canTweet = props.canTweet === "false" ? false : true
  const handleNewTweet = (newTweet) =>{
    let tempNewTweets = [...newTweets]
      tempNewTweets.unshift(newTweet)
      setNewTweets(tempNewTweets) 
    }

  return <div className={props.className}>
          {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12mb-3' />}
          <TweetsList newTweets={newTweets} {...props} />
    </div>
}






