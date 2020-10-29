import React, {useState} from 'react';
import {ActionBtn} from './buttons'

export function ParentTweet(props){
  //to show parent tweet(when retweeted)
    const {tweet} = props
    return tweet.parent ? <div className='row'>
              <div className='col-11 mx-auto p-3 border rounded'>
                <p className='mb-0 text-muted small'>Retweet</p>
                <Tweet hideActions className={' '} tweet={tweet.parent} />
              </div>
            </div> : null
  
  }
  
  export function Tweet(props){
    const {tweet, didRetweet, hideActions} = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    //to store the content of tweet & also modify the tweet when liked/unliked
    //console.log(actionTweet)
    //console.log(tweet)
    const className = props.className ? props.className : 'col-10mx-auto cold-md-6'
  
    const handlePerformAction = (newActionTweet, status) => {
      //to perform some action when orignal tweet came to know its been retweeted, liked or unliked.
      if (status === 200){
        console.log(newActionTweet)
        setActionTweet(newActionTweet)
        //we change the state of tweet, which is been liked or unliked
      } else if (status === 201){
        if (didRetweet){
          didRetweet(newActionTweet)
        }
        //let the tweet list know
      }
      
    }
  
    return  <div className={className}>
              <div>
                <p>{tweet.id} - {tweet.content}</p>
                <ParentTweet tweet={tweet} />
                </div>
              {(actionTweet && hideActions !== true) && <div className='btn btn-group'>
                <ActionBtn  tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"like", display:"Likes"}} />
                <ActionBtn  tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"unlike", display:"UnLike"}} />
                <ActionBtn  tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"retweet", display:"Retweet"}} />
              </div>
              }
            </div>
  }
  