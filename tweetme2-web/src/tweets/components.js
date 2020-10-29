import React, {useState} from 'react';
import {TweetCreate} from './create'
import {TweetsList} from './list'


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






